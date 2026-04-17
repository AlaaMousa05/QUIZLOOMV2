import { useEffect, useState, useCallback, useMemo } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Stack,
  Divider,
  Container,
  Tooltip,
  Button,
} from "@mui/material";

import QuestionCard from "../../components//questionCard/QuestionCard";
import Timer from "../../components/timer/Timer";
import Loader from "../../../components/loader/Loader";
import ConfirmDialog from "../../../admin/components/confirmDialog/ConfirmDialog";
import { api } from "../../../api/baseUrl";
import {
  rootBox,
  appBarStyle,
  toolBarStyle,
  quizTitle,
  containerStyle,
  headingText,
  submitButtonContainer,
} from "./Quiz.styles";

const DURATION = 30 * 60;

export default function Quiz() {
  const navigate = useNavigate();
  const { subCategoryId } = useParams();
  const location = useLocation();
  const { subCategory } = location.state || {};
  const { user } = useSelector((state) => state.auth);

  const [loading, setLoading] = useState(true);
  const [quizId, setQuizId] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [startTime, setStartTime] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [submitError, setSubmitError] = useState("");

  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        setLoading(true);
        setSubmitError("");
        setCurrent(0);

        const { data } = await api.post("/quizzes/start", {
          subCategoryId,
          numberOfQuestions: 20,
        });

        if (!mounted) return;
        setQuizId(data.quizId);
        setQuestions(data.questions || []);
        setAnswers(data.answers || []);
        setStartTime(data.startTime);
      } catch (err) {
        if (mounted) {
          setSubmitError(
            err.response?.data?.message || "Failed to load quiz questions"
          );
          setQuestions([]);
          setAnswers([]);
        }
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, [subCategoryId, user?._id]);

  const handleSelect = useCallback(
    async (id, optionIndex) => {
      if (!quizId) return;

      setAnswers((prev) => {
        const existing = prev.find((a) => (a.id || a.questionId) === id);
        if (existing) {
          return prev.map((a) =>
            (a.id || a.questionId) === id
              ? { ...a, selectedAnswer: optionIndex, id }
              : a
          );
        }
        return [...prev, { id, selectedAnswer: optionIndex }];
      });

      await api.put(`/quizzes/${quizId}/answer`, {
        id,
        selectedAnswer: optionIndex,
      });
    },
    [quizId]
  );

  const goNext = useCallback(
    () => setCurrent((c) => Math.min(c + 1, questions.length - 1)),
    [questions.length]
  );

  const goPrev = useCallback(() => setCurrent((c) => Math.max(c - 1, 0)), []);

  const handleSubmit = useCallback(async () => {
    if (!quizId || submitting) return;
    setSubmitting(true);
    setSubmitError("");

    try {
      const endTime = Date.now();
      const timeTaken = startTime ? (endTime - new Date(startTime).getTime()) / 1000 : 0;

      const { data } = await api.post("/results", {
        quizId,
        answers,
        timeTaken,
      });
      navigate(`/student/quiz/${quizId}/submitted`, {
        state: { result: data.result || data },
      });
    } catch (err) {
      setSubmitError(
        err.response?.data?.message || "Failed to submit quiz. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  }, [quizId, submitting, navigate, answers, startTime]);

  const currentQuestion = useMemo(
    () => (questions.length > 0 ? questions[current] : null),
    [questions, current]
  );

  return (
    <Box sx={rootBox}>
      <AppBar position="static" color="inherit" elevation={0} sx={appBarStyle}>
        <Toolbar sx={toolBarStyle}>
          <Typography variant="h6" sx={quizTitle}>
            {subCategory?.name || "Quiz"}
          </Typography>
          {startTime && (
            <Timer startTime={startTime} duration={DURATION} onTimeEnd={handleSubmit} />
          )}
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={containerStyle}>
        {loading ? (
          <Loader />
        ) : (
          <Stack spacing={3}>
            <Typography variant="h5" sx={headingText}>
              Quiz - {questions.length} Questions
            </Typography>
            {submitError && <Typography color="error">{submitError}</Typography>}
            <Divider />
            {currentQuestion && (
              <QuestionCard
                q={currentQuestion}
                index={current}
                answers={answers}
                handleSelect={handleSelect}
                current={current}
                goNext={goNext}
                goPrev={goPrev}
                totalQuestions={questions.length}
              />
            )}
          </Stack>
        )}
      </Container>

      <Box sx={submitButtonContainer}>
        <Tooltip title="Submit your quiz">
          <Button
            color="primary"
            variant="contained"
            onClick={() => setConfirmOpen(true)}
            disabled={submitting || !questions.length}
          >
            Submit Quiz
          </Button>
        </Tooltip>
      </Box>

      <ConfirmDialog
        open={confirmOpen}
        title="Submit Quiz"
        message="Are you sure you want to submit your quiz?"
        onClose={() => setConfirmOpen(false)}
        onConfirm={async () => {
          setConfirmOpen(false);
          await handleSubmit();
        }}
      />
    </Box>
  );
}
