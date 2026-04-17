const User = require('../models/User');
const Result = require('../models/Result');

const buildDisplayName = (student) => {
  const fullName = `${student.firstName || ''} ${student.lastName || ''}`.trim();
  return fullName || student.username || student.email;
};

const enrichStudent = (student, stats = {}) => {
  const obj = student.toObject ? student.toObject() : student;
  return {
    ...obj,
    name: buildDisplayName(obj),
    fullName: buildDisplayName(obj),
    avatar: obj.profileImage || '',
    quizzesCompleted: stats.quizzesCompleted || 0,
    score: Number((stats.score || 0).toFixed(2)),
    status: obj.isActive ? 'Active' : 'Inactive'
  };
};

exports.getAllStudents = async (req, res) => {
  try {
    const students = await User.find({ role: 'student', isActive: true })
      .select('-password')
      .sort({ createdAt: -1 });

    const studentIds = students.map((s) => s._id);
    const aggregated = await Result.aggregate([
      { $match: { student: { $in: studentIds } } },
      {
        $group: {
          _id: '$student',
          quizzesCompleted: { $sum: 1 },
          score: { $avg: '$percentage' }
        }
      }
    ]);
    const statsMap = new Map(aggregated.map((row) => [row._id.toString(), row]));
    const studentsWithStats = students.map((student) =>
      enrichStudent(student, statsMap.get(student._id.toString()))
    );

    res.status(200).json({
      success: true,
      count: studentsWithStats.length,
      students: studentsWithStats
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.getStudentById = async (req, res) => {
  try {
    const student = await User.findById(req.params.id).select('-password');

    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student not found'
      });
    }

    const results = await Result.find({ student: student._id }).select('percentage');
    const quizzesCompleted = results.length;
    const score = quizzesCompleted > 0
      ? results.reduce((sum, r) => sum + r.percentage, 0) / quizzesCompleted
      : 0;

    res.status(200).json({
      success: true,
      student: enrichStudent(student, { quizzesCompleted, score })
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.getStudentProfile = async (req, res) => {
  try {
    const student = await User.findById(req.user.id).select('-password');

    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student not found'
      });
    }

    // Get student results
    const Result = require('../models/Result');
    const results = await Result.find({ student: req.user.id });

    const totalAttempts = results.length;
    const passedAttempts = results.filter(r => r.isPassed).length;
    const averageScore = totalAttempts > 0
      ? results.reduce((sum, r) => sum + r.percentage, 0) / totalAttempts
      : 0;
    const quizzesCompleted = totalAttempts;

    res.status(200).json({
      success: true,
      student: enrichStudent(student, { quizzesCompleted, score: averageScore }),
      stats: {
        totalAttempts,
        passedAttempts,
        averageScore: Number(averageScore.toFixed(2))
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.updateStudentProfile = async (req, res) => {
  try {
    const student = await User.findById(req.user.id).select('+password');

    if (!student || student.role !== 'student') {
      return res.status(404).json({
        success: false,
        message: 'Student not found'
      });
    }

    const {
      fullName,
      username,
      email,
      password,
      avatar,
      profileImage,
      firstName,
      lastName
    } = req.body;

    if (typeof fullName === 'string') {
      const parts = fullName.trim().split(/\s+/).filter(Boolean);
      student.firstName = parts.shift() || '';
      student.lastName = parts.join(' ');
    }

    if (typeof firstName === 'string') student.firstName = firstName.trim();
    if (typeof lastName === 'string') student.lastName = lastName.trim();
    if (typeof username === 'string') student.username = username.trim();
    if (typeof email === 'string') student.email = email.trim().toLowerCase();
    if (typeof avatar === 'string') student.profileImage = avatar;
    if (typeof profileImage === 'string') student.profileImage = profileImage;
    if (typeof password === 'string' && password.trim()) {
      student.password = password.trim();
    }

    await student.save();

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      student: enrichStudent(student)
    });
  } catch (error) {
    const isDuplicate = error?.code === 11000;
    res.status(isDuplicate ? 400 : 500).json({
      success: false,
      message: isDuplicate
        ? 'Username or email already exists'
        : error.message
    });
  }
};

exports.updateStudentStatus = async (req, res) => {
  try {
    const { isActive } = req.body;

    const student = await User.findByIdAndUpdate(
      req.params.id,
      { isActive },
      { new: true }
    ).select('-password');

    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Student status updated successfully',
      student
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.deleteStudent = async (req, res) => {
  try {
    const student = await User.findOneAndUpdate(
      { _id: req.params.id, role: 'student' },
      { isActive: false },
      { new: true }
    ).select('-password');

    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Student deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.searchStudents = async (req, res) => {
  try {
    const { keyword } = req.query;

    const students = await User.find({
      role: 'student',
      isActive: true,
      $or: [
        { firstName: { $regex: keyword, $options: 'i' } },
        { lastName: { $regex: keyword, $options: 'i' } },
        { email: { $regex: keyword, $options: 'i' } },
        { enrollmentNumber: { $regex: keyword, $options: 'i' } }
      ]
    }).select('-password');

    const studentIds = students.map((s) => s._id);
    const aggregated = await Result.aggregate([
      { $match: { student: { $in: studentIds } } },
      {
        $group: {
          _id: '$student',
          quizzesCompleted: { $sum: 1 },
          score: { $avg: '$percentage' }
        }
      }
    ]);
    const statsMap = new Map(aggregated.map((row) => [row._id.toString(), row]));
    const studentsWithStats = students.map((student) =>
      enrichStudent(student, statsMap.get(student._id.toString()))
    );

    res.status(200).json({
      success: true,
      count: studentsWithStats.length,
      students: studentsWithStats
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.getStudentPerformance = async (req, res) => {
  try {
    let results = [];
    let totalStudents = 0;

    if (req.user.role === 'admin') {
      const students = await User.find({ role: 'student', isActive: true }).select('_id');
      const studentIds = students.map((s) => s._id);
      totalStudents = studentIds.length;
      results = await Result.find({ student: { $in: studentIds } }).select('percentage isPassed student');
    } else {
      results = await Result.find({ student: req.user.id }).select('percentage isPassed student');
      totalStudents = 1;
    }

    const totalAttempts = results.length;
    const passedAttempts = results.filter((r) => r.isPassed).length;
    const failedAttempts = totalAttempts - passedAttempts;
    const averagePercentage = totalAttempts > 0
      ? results.reduce((sum, r) => sum + r.percentage, 0) / totalAttempts
      : 0;

    const perStudentAverage = new Map();
    results.forEach((result) => {
      const key = result.student.toString();
      if (!perStudentAverage.has(key)) {
        perStudentAverage.set(key, { total: 0, count: 0 });
      }
      const item = perStudentAverage.get(key);
      item.total += result.percentage;
      item.count += 1;
    });

    let motivatedStudents = 0;
    perStudentAverage.forEach((value) => {
      const avg = value.count > 0 ? value.total / value.count : 0;
      if (avg >= 70) motivatedStudents += 1;
    });

    const weakStudents = Math.max(totalStudents - motivatedStudents, 0);
    const stats = {
      totalStudents,
      totalAttempts,
      passedAttempts,
      failedAttempts,
      avgScore: Number(averagePercentage.toFixed(2)),
      passRate: totalAttempts > 0 ? Number(((passedAttempts / totalAttempts) * 100).toFixed(2)) : 0,
      failRate: totalAttempts > 0 ? Number(((failedAttempts / totalAttempts) * 100).toFixed(2)) : 0,
      motivatedStudents,
      weakStudents
    };

    res.status(200).json({
      success: true,
      stats
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
