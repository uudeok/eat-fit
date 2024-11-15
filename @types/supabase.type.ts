export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      analysis: {
        Row: {
          cheering: string
          created_at: string
          evaluates: string
          id: number
          possibility: string
          tips: string[]
          user_id: string
        }
        Insert: {
          cheering: string
          created_at?: string
          evaluates: string
          id?: number
          possibility: string
          tips: string[]
          user_id?: string
        }
        Update: {
          cheering?: string
          created_at?: string
          evaluates?: string
          id?: number
          possibility?: string
          tips?: string[]
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "analysis_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      dailySpec: {
        Row: {
          created_at: string
          diary: string | null
          entry_date: string
          goal_id: number
          id: number
          mood: Database["public"]["Enums"]["EmotionType"] | null
          today_weight: number | null
          user_id: string
        }
        Insert: {
          created_at?: string
          diary?: string | null
          entry_date: string
          goal_id: number
          id?: number
          mood?: Database["public"]["Enums"]["EmotionType"] | null
          today_weight?: number | null
          user_id?: string
        }
        Update: {
          created_at?: string
          diary?: string | null
          entry_date?: string
          goal_id?: number
          id?: number
          mood?: Database["public"]["Enums"]["EmotionType"] | null
          today_weight?: number | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "dailySpec_goal_id_fkey"
            columns: ["goal_id"]
            isOneToOne: false
            referencedRelation: "goals"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "dailySpec_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "goals"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "dailySpec_user_id_fkey1"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "goals"
            referencedColumns: ["user_id"]
          },
        ]
      }
      exercises: {
        Row: {
          created_at: string
          daily_id: number
          entry_date: string
          exercise: Json[]
          id: number
          photo_url: string[] | null
          user_id: string
        }
        Insert: {
          created_at?: string
          daily_id: number
          entry_date: string
          exercise: Json[]
          id?: number
          photo_url?: string[] | null
          user_id?: string
        }
        Update: {
          created_at?: string
          daily_id?: number
          entry_date?: string
          exercise?: Json[]
          id?: number
          photo_url?: string[] | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "exercises_daily_id_fkey"
            columns: ["daily_id"]
            isOneToOne: false
            referencedRelation: "dailySpec"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "exercises_user_id_fkey1"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      goals: {
        Row: {
          activity_level: Database["public"]["Enums"]["ActivityLevelType"]
          age: number
          created_at: string
          daily_calories: number
          daily_carb: number
          daily_fat: number
          daily_protein: number
          gender: Database["public"]["Enums"]["GenderType"]
          goal_end_date: string
          goal_period: number
          goal_start_date: string
          goal_status: Database["public"]["Enums"]["GoalStatusType"]
          height: number
          id: number
          meal_plan: Database["public"]["Enums"]["MealPlanType"]
          target_weight: number
          user_id: string
          weight: number
        }
        Insert: {
          activity_level: Database["public"]["Enums"]["ActivityLevelType"]
          age: number
          created_at?: string
          daily_calories: number
          daily_carb: number
          daily_fat: number
          daily_protein: number
          gender: Database["public"]["Enums"]["GenderType"]
          goal_end_date: string
          goal_period: number
          goal_start_date: string
          goal_status?: Database["public"]["Enums"]["GoalStatusType"]
          height: number
          id?: number
          meal_plan: Database["public"]["Enums"]["MealPlanType"]
          target_weight: number
          user_id?: string
          weight: number
        }
        Update: {
          activity_level?: Database["public"]["Enums"]["ActivityLevelType"]
          age?: number
          created_at?: string
          daily_calories?: number
          daily_carb?: number
          daily_fat?: number
          daily_protein?: number
          gender?: Database["public"]["Enums"]["GenderType"]
          goal_end_date?: string
          goal_period?: number
          goal_start_date?: string
          goal_status?: Database["public"]["Enums"]["GoalStatusType"]
          height?: number
          id?: number
          meal_plan?: Database["public"]["Enums"]["MealPlanType"]
          target_weight?: number
          user_id?: string
          weight?: number
        }
        Relationships: []
      }
      meals: {
        Row: {
          created_at: string
          daily_id: number
          entry_date: string
          id: number
          meal: Json[]
          meal_type: Database["public"]["Enums"]["MealType"]
          photo_url: string[] | null
          serving_time: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          daily_id: number
          entry_date: string
          id?: number
          meal: Json[]
          meal_type: Database["public"]["Enums"]["MealType"]
          photo_url?: string[] | null
          serving_time?: string | null
          user_id?: string
        }
        Update: {
          created_at?: string
          daily_id?: number
          entry_date?: string
          id?: number
          meal?: Json[]
          meal_type?: Database["public"]["Enums"]["MealType"]
          photo_url?: string[] | null
          serving_time?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "meals_daily_id_fkey"
            columns: ["daily_id"]
            isOneToOne: false
            referencedRelation: "dailySpec"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "meals_user_id_fkey2"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      met: {
        Row: {
          exercise_name: string
          id: number
          met: number
        }
        Insert: {
          exercise_name: string
          id?: number
          met: number
        }
        Update: {
          exercise_name?: string
          id?: number
          met?: number
        }
        Relationships: []
      }
      users: {
        Row: {
          avatar_url: string | null
          content: string | null
          created_at: string | null
          email: string
          expose: string | null
          id: string
          nickname: string
          role: string | null
          username: string | null
        }
        Insert: {
          avatar_url?: string | null
          content?: string | null
          created_at?: string | null
          email: string
          expose?: string | null
          id?: string
          nickname: string
          role?: string | null
          username?: string | null
        }
        Update: {
          avatar_url?: string | null
          content?: string | null
          created_at?: string | null
          email?: string
          expose?: string | null
          id?: string
          nickname?: string
          role?: string | null
          username?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      generate_random_string: {
        Args: {
          length: number
        }
        Returns: string
      }
    }
    Enums: {
      ActivityLevelType: "very_low" | "low" | "moderate" | "high" | "very_high"
      EmotionType: "good" | "sad" | "gloomy" | "hungry" | "tired" | "angry"
      GenderType: "F" | "M"
      GoalStatusType: "progress" | "success" | "failure"
      MealPlanType: "normal" | "lowCarbHighFat" | "proteinFocused"
      MealType: "meal" | "snack" | "night_meal"
      UserExposeType: "public" | "privacy" | "follower"
      UserRoleType: "general" | "admin" | "manager"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
