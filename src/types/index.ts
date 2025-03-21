export interface Participant {
  id: string;
  name: string;
  email: string;
  phone: string;
  ticket_type: string;
  checked_in: boolean;
  check_in_time: string | null;
}

export interface ApiResponse {
  success: boolean;
  message: string;
  data?: Participant;
}

export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  password: string;
  organizerIds: number[]; // ✅ Pastikan ini adalah array
}
