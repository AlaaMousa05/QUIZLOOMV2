import React from "react";
import { useParams } from "react-router-dom";
import { useFetch } from "../../../hooks/useFetch";
import QuestionItem from "../../components/questionItem/QuestionItem";
import CircleChart from "../../components/circleChart/CircleChart";
import Loader from "../../../components/loader/Loader";
import NotFoundData from "../../../components/notFoundData/NotFoundData";
import StatCard from "../../components/statCard/StatCard";
import SearchBar from "../../../components/searchBar/SearchBar";
import FilterBar from "../../../components/filterBar/FilterBar";
import loadingImg from "../../../images/Loading-rafiki (1).png";
import noDataImg from "../../../images/undraw_no-data_ig65 (1).png";
import { QUESTION_TYPES } from "../../../enums/enum";
import { Box, Typography, Divider, Stack } from "@mui/material";
import { useSearchFilter } from "../../../hooks/useSearchFilter";
import { styles } from '../students/style'
import {
  pageWrapper,
  searchStack,
  contentWrapper,
  leftColumn,
  rightColumn,
  dividerStyle,
} from "./QuestionBank.styles";

export default function QuestionBank() {
  const { questionBankId } = useParams();
  const { data, loading, error } = useFetch(
    `categories/subcategories/${questionBankId}/questions`
  );
console.log("Fetched questions:", data);
  const { search, type, setSearch, setType, filterItems } = useSearchFilter();
  const filterOptions = [
    { value: QUESTION_TYPES.TF, label: "True/False" },
    { value: QUESTION_TYPES.MCQ, label: "Multiple Choice" },
  ];

  const filteredQuestions = React.useMemo(() => {
    if (!data?.questions) return [];
    return filterItems(data.questions);
  }, [data?.questions, search, type]);

  const sidebarStats = {
    title: "Total Questions",
    value: data?.questions?.length || 0,
    bgcolor: "#3f19ca",
    color: "#fff",
  };

  const questionTypeStats = React.useMemo(() => {
    if (!data?.questions) return [];
    const counts = data.questions.reduce(
      (acc, question) => {
        if (question.type === QUESTION_TYPES.TF) acc[0].value += 1;
        else if (question.type === QUESTION_TYPES.MCQ) acc[1].value += 1;
        return acc;
      },
      [
        { label: "True / False", value: 0 },
        { label: "Multiple Choice", value: 0 },
      ]
    );
    return counts;
  }, [data]);

  return (
    <Box sx={pageWrapper}>
      <Typography variant="h4" gutterBottom sx={styles.title}>
        Question Bank
      </Typography>
      <Stack spacing={2} sx={searchStack}>
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Search questions by text..."
        />
        <FilterBar
          value={type}
          onChange={setType}
          onClear={() => setType("")}
          options={filterOptions}
        />
      </Stack>

      {loading && <Loader />}

      {error && (
        <NotFoundData message="Error loading questions" imag={loadingImg} />
      )}

      {!loading && !error && data?.questions?.length === 0 && (
        <NotFoundData message="No Questions Available" imag={noDataImg} />
      )}

      {!loading && !error && data?.questions?.length > 0 && (
        <Box sx={contentWrapper}>
          <Box sx={leftColumn}>
            {filteredQuestions.length === 0 ? (
              <NotFoundData
                message="No questions match your search criteria"
                imag={noDataImg}
              />
            ) : (
              filteredQuestions.map((question, idx) => (
                <QuestionItem key={idx} question={question} />
              ))
            )}
          </Box>

          <Box sx={rightColumn}>
            <CircleChart
              data={questionTypeStats}
              title="Question Distribution"
            />
            <Divider sx={dividerStyle} />
            <StatCard
              title={sidebarStats.title}
              value={sidebarStats.value}
              bgcolor={sidebarStats.bgcolor}
              color={sidebarStats.color}
            />
          </Box>
        </Box>
      )}
    </Box>
  );
}