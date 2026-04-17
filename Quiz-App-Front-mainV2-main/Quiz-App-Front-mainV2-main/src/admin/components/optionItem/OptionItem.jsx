import { Box } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import { Item } from "./optionItemStyle";
const OptionItem = ({ option, correctAnswer, Id }) => {
  const correct = correctAnswer == Id;
  return (
    <Box
      sx={{
        flex: { xs: "1 1 100%", sm: "1 1 calc(50% - 8px)" },
      }}
    >
      <Item correct={correct}>
        {correct ? (
          <CheckCircleIcon sx={{ color: "green", fontSize: 18 }} />
        ) : (
          <CancelIcon sx={{ color: "#6c0303ff", fontSize: 18 }} />
        )}
        {option}
      </Item>
    </Box>
  );
};

export default OptionItem;
