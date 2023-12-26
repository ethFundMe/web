export interface ErrorResponse {
  name: string;
  message: string;
  details?: {
    field: string;
    reason: string;
  };
}
