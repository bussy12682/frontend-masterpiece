export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.18"
  }
  public: {
    Tables: {
      academic_sessions: {
        Row: {
          created_at: string
          is_active: boolean
          name: string
        }
        Insert: {
          created_at?: string
          is_active?: boolean
          name: string
        }
        Update: {
          created_at?: string
          is_active?: boolean
          name?: string
        }
        Relationships: []
      }
      academic_terms: {
        Row: {
          created_at: string
          end_date: string | null
          is_active: boolean
          name: string
          session_name: string
          start_date: string | null
        }
        Insert: {
          created_at?: string
          end_date?: string | null
          is_active?: boolean
          name: string
          session_name: string
          start_date?: string | null
        }
        Update: {
          created_at?: string
          end_date?: string | null
          is_active?: boolean
          name?: string
          session_name?: string
          start_date?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "academic_terms_session_name_fkey"
            columns: ["session_name"]
            isOneToOne: false
            referencedRelation: "academic_sessions"
            referencedColumns: ["name"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string
          display_name: string
          email: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          display_name?: string
          email?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          display_name?: string
          email?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      school_classes: {
        Row: {
          arm: string
          created_at: string
          level: string
          name: string
        }
        Insert: {
          arm: string
          created_at?: string
          level: string
          name: string
        }
        Update: {
          arm?: string
          created_at?: string
          level?: string
          name?: string
        }
        Relationships: []
      }
      school_settings: {
        Row: {
          address: string
          email: string
          id: number
          name: string
          phone: string
          updated_at: string
        }
        Insert: {
          address?: string
          email?: string
          id: number
          name: string
          phone?: string
          updated_at?: string
        }
        Update: {
          address?: string
          email?: string
          id?: number
          name?: string
          phone?: string
          updated_at?: string
        }
        Relationships: []
      }
      student_attendance: {
        Row: {
          attendance_date: string
          class_name: string
          created_at: string
          entered_by: string | null
          id: string
          session_name: string
          status: string
          student_id: string
          term_name: string
        }
        Insert: {
          attendance_date: string
          class_name: string
          created_at?: string
          entered_by?: string | null
          id?: string
          session_name: string
          status: string
          student_id: string
          term_name: string
        }
        Update: {
          attendance_date?: string
          class_name?: string
          created_at?: string
          entered_by?: string | null
          id?: string
          session_name?: string
          status?: string
          student_id?: string
          term_name?: string
        }
        Relationships: [
          {
            foreignKeyName: "student_attendance_class_name_fkey"
            columns: ["class_name"]
            isOneToOne: false
            referencedRelation: "school_classes"
            referencedColumns: ["name"]
          },
          {
            foreignKeyName: "student_attendance_entered_by_fkey"
            columns: ["entered_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "student_attendance_session_name_term_name_fkey"
            columns: ["session_name", "term_name"]
            isOneToOne: false
            referencedRelation: "academic_terms"
            referencedColumns: ["session_name", "name"]
          },
          {
            foreignKeyName: "student_attendance_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
        ]
      }
      student_scores: {
        Row: {
          class_name: string
          created_at: string
          entered_by: string | null
          exam: number
          id: string
          session_name: string
          student_id: string
          subject_code: string
          term_name: string
          test_one: number
          test_two: number
          updated_at: string
        }
        Insert: {
          class_name: string
          created_at?: string
          entered_by?: string | null
          exam?: number
          id?: string
          session_name: string
          student_id: string
          subject_code: string
          term_name: string
          test_one?: number
          test_two?: number
          updated_at?: string
        }
        Update: {
          class_name?: string
          created_at?: string
          entered_by?: string | null
          exam?: number
          id?: string
          session_name?: string
          student_id?: string
          subject_code?: string
          term_name?: string
          test_one?: number
          test_two?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "student_scores_class_name_fkey"
            columns: ["class_name"]
            isOneToOne: false
            referencedRelation: "school_classes"
            referencedColumns: ["name"]
          },
          {
            foreignKeyName: "student_scores_entered_by_fkey"
            columns: ["entered_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "student_scores_session_name_term_name_fkey"
            columns: ["session_name", "term_name"]
            isOneToOne: false
            referencedRelation: "academic_terms"
            referencedColumns: ["session_name", "name"]
          },
          {
            foreignKeyName: "student_scores_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "student_scores_subject_code_fkey"
            columns: ["subject_code"]
            isOneToOne: false
            referencedRelation: "subjects"
            referencedColumns: ["code"]
          },
        ]
      }
      students: {
        Row: {
          admission_no: string
          age: number
          class_name: string
          created_at: string
          gender: string
          id: string
          name: string
          updated_at: string
        }
        Insert: {
          admission_no: string
          age: number
          class_name: string
          created_at?: string
          gender: string
          id?: string
          name: string
          updated_at?: string
        }
        Update: {
          admission_no?: string
          age?: number
          class_name?: string
          created_at?: string
          gender?: string
          id?: string
          name?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "students_class_name_fkey"
            columns: ["class_name"]
            isOneToOne: false
            referencedRelation: "school_classes"
            referencedColumns: ["name"]
          },
        ]
      }
      subjects: {
        Row: {
          code: string
          created_at: string
          name: string
        }
        Insert: {
          code: string
          created_at?: string
          name: string
        }
        Update: {
          code?: string
          created_at?: string
          name?: string
        }
        Relationships: []
      }
      teacher_assignments: {
        Row: {
          class_name: string
          created_at: string
          id: string
          session_name: string
          subject_code: string
          teacher_name: string
          teacher_user_id: string | null
          term_name: string
        }
        Insert: {
          class_name: string
          created_at?: string
          id?: string
          session_name: string
          subject_code: string
          teacher_name: string
          teacher_user_id?: string | null
          term_name: string
        }
        Update: {
          class_name?: string
          created_at?: string
          id?: string
          session_name?: string
          subject_code?: string
          teacher_name?: string
          teacher_user_id?: string | null
          term_name?: string
        }
        Relationships: [
          {
            foreignKeyName: "teacher_assignments_class_name_fkey"
            columns: ["class_name"]
            isOneToOne: false
            referencedRelation: "school_classes"
            referencedColumns: ["name"]
          },
          {
            foreignKeyName: "teacher_assignments_session_name_fkey"
            columns: ["session_name"]
            isOneToOne: false
            referencedRelation: "academic_sessions"
            referencedColumns: ["name"]
          },
          {
            foreignKeyName: "teacher_assignments_session_name_term_name_fkey"
            columns: ["session_name", "term_name"]
            isOneToOne: false
            referencedRelation: "academic_terms"
            referencedColumns: ["session_name", "name"]
          },
          {
            foreignKeyName: "teacher_assignments_subject_code_fkey"
            columns: ["subject_code"]
            isOneToOne: false
            referencedRelation: "subjects"
            referencedColumns: ["code"]
          },
          {
            foreignKeyName: "teacher_assignments_teacher_user_id_fkey"
            columns: ["teacher_user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "teacher"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "teacher"],
    },
  },
} as const
