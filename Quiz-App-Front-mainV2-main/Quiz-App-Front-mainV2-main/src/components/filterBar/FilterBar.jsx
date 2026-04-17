import {
  Box,
  Select,
  MenuItem,
  FormControl,
  Typography,
  Chip,
} from "@mui/material";
import {
  FilterList as FilterIcon,
  Clear as ClearIcon,
} from "@mui/icons-material";

const FilterBar = ({ value, onChange, onClear, options }) => {
  const handleTypeChange = (event) => {
    onChange(event.target.value);
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          borderRadius: 2,
          padding: "4px 12px",
          backgroundColor: "#e3f2fd",
        }}
      >
        <FilterIcon sx={{ color: "#1976d2" }} />
        <Typography variant="body2" sx={{ color: "#1976d2", fontWeight: 500 }}>
          Filter by type:
        </Typography>

        <FormControl size="small" sx={{ minWidth: 150 }}>
          <Select
            value={value || ""}
            onChange={handleTypeChange}
            displayEmpty
            sx={{
              borderRadius: 2,
              backgroundColor: "#fff",
              "& .MuiOutlinedInput-notchedOutline": {
                border: "none",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                border: "none",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                border: "none",
              },
            }}
          >
            <MenuItem value="">
              <em>All Types</em>
            </MenuItem>
            {options.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {value && (
        <Chip
          label={`Type: ${
            options.find((opt) => opt.value === value)?.label || value
          }`}
          variant="outlined"
          size="small"
          onDelete={onClear}
          deleteIcon={<ClearIcon fontSize="small" />}
          sx={{
            borderColor: "#1976d2",
            color: "#1976d2",
            "&:hover": {
              backgroundColor: "#e3f2fd",
            },
          }}
        />
      )}
    </Box>
  );
};

export default FilterBar;
