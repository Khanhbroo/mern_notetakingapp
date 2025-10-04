import axios from "axios";
import toast from "react-hot-toast";

export const formatDate = (date: Date): string => {
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

export function handleAxiosError(
  error: unknown,
  defaultMessage = "Something went wrong",
  onRateLimit?: () => void
) {
  if (axios.isAxiosError(error)) {
    const status = error.response?.status;

    if (status === 429) {
      toast.error("Too many requests! Slow down ⏳");
      if (onRateLimit) onRateLimit();
    } else {
      toast.error(defaultMessage);
    }
  } else {
    toast.error("Unexpected error occurred");
  }
}
