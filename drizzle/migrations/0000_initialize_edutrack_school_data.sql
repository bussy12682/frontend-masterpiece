CREATE TYPE public.app_role AS ENUM ('admin', 'teacher');

CREATE TABLE public.profiles (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name TEXT NOT NULL DEFAULT '',
  email TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.profiles TO authenticated;
GRANT ALL ON public.profiles TO service_role;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE TABLE public.user_roles (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL DEFAULT 'teacher',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role public.app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  );
$$;
REVOKE ALL ON FUNCTION public.has_role(UUID, public.app_role) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.has_role(UUID, public.app_role) TO authenticated;

CREATE TABLE public.school_settings (
  id SMALLINT PRIMARY KEY CHECK (id = 1),
  name TEXT NOT NULL,
  email TEXT NOT NULL DEFAULT '',
  phone TEXT NOT NULL DEFAULT '',
  address TEXT NOT NULL DEFAULT '',
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.school_settings TO authenticated;
GRANT ALL ON public.school_settings TO service_role;
ALTER TABLE public.school_settings ENABLE ROW LEVEL SECURITY;

CREATE TABLE public.academic_sessions (
  name TEXT PRIMARY KEY,
  is_active BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.academic_sessions TO authenticated;
GRANT ALL ON public.academic_sessions TO service_role;
ALTER TABLE public.academic_sessions ENABLE ROW LEVEL SECURITY;

CREATE TABLE public.academic_terms (
  session_name TEXT NOT NULL REFERENCES public.academic_sessions(name) ON UPDATE CASCADE,
  name TEXT NOT NULL,
  start_date DATE,
  end_date DATE,
  is_active BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  PRIMARY KEY (session_name, name)
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.academic_terms TO authenticated;
GRANT ALL ON public.academic_terms TO service_role;
ALTER TABLE public.academic_terms ENABLE ROW LEVEL SECURITY;

CREATE TABLE public.school_classes (
  name TEXT PRIMARY KEY,
  level TEXT NOT NULL,
  arm TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.school_classes TO authenticated;
GRANT ALL ON public.school_classes TO service_role;
ALTER TABLE public.school_classes ENABLE ROW LEVEL SECURITY;

CREATE TABLE public.subjects (
  code TEXT PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.subjects TO authenticated;
GRANT ALL ON public.subjects TO service_role;
ALTER TABLE public.subjects ENABLE ROW LEVEL SECURITY;

CREATE TABLE public.students (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  admission_no TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  class_name TEXT NOT NULL REFERENCES public.school_classes(name) ON UPDATE CASCADE,
  age SMALLINT NOT NULL CHECK (age BETWEEN 3 AND 30),
  gender TEXT NOT NULL CHECK (gender IN ('Male', 'Female', 'Other')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.students TO authenticated;
GRANT ALL ON public.students TO service_role;
ALTER TABLE public.students ENABLE ROW LEVEL SECURITY;

CREATE TABLE public.teacher_assignments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  teacher_user_id UUID REFERENCES public.profiles(user_id) ON DELETE SET NULL,
  teacher_name TEXT NOT NULL,
  subject_code TEXT NOT NULL REFERENCES public.subjects(code) ON UPDATE CASCADE,
  class_name TEXT NOT NULL REFERENCES public.school_classes(name) ON UPDATE CASCADE,
  session_name TEXT NOT NULL REFERENCES public.academic_sessions(name) ON UPDATE CASCADE,
  term_name TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (class_name, subject_code, session_name, term_name),
  FOREIGN KEY (session_name, term_name) REFERENCES public.academic_terms(session_name, name) ON UPDATE CASCADE
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.teacher_assignments TO authenticated;
GRANT ALL ON public.teacher_assignments TO service_role;
ALTER TABLE public.teacher_assignments ENABLE ROW LEVEL SECURITY;

CREATE TABLE public.student_scores (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID NOT NULL REFERENCES public.students(id) ON DELETE CASCADE,
  class_name TEXT NOT NULL REFERENCES public.school_classes(name) ON UPDATE CASCADE,
  subject_code TEXT NOT NULL REFERENCES public.subjects(code) ON UPDATE CASCADE,
  session_name TEXT NOT NULL,
  term_name TEXT NOT NULL,
  test_one SMALLINT NOT NULL DEFAULT 0 CHECK (test_one BETWEEN 0 AND 20),
  test_two SMALLINT NOT NULL DEFAULT 0 CHECK (test_two BETWEEN 0 AND 20),
  exam SMALLINT NOT NULL DEFAULT 0 CHECK (exam BETWEEN 0 AND 60),
  entered_by UUID REFERENCES public.profiles(user_id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (student_id, subject_code, session_name, term_name),
  FOREIGN KEY (session_name, term_name) REFERENCES public.academic_terms(session_name, name) ON UPDATE CASCADE
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.student_scores TO authenticated;
GRANT ALL ON public.student_scores TO service_role;
ALTER TABLE public.student_scores ENABLE ROW LEVEL SECURITY;

CREATE TABLE public.student_attendance (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID NOT NULL REFERENCES public.students(id) ON DELETE CASCADE,
  class_name TEXT NOT NULL REFERENCES public.school_classes(name) ON UPDATE CASCADE,
  session_name TEXT NOT NULL,
  term_name TEXT NOT NULL,
  attendance_date DATE NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('Present', 'Absent', 'Late')),
  entered_by UUID REFERENCES public.profiles(user_id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (student_id, attendance_date),
  FOREIGN KEY (session_name, term_name) REFERENCES public.academic_terms(session_name, name) ON UPDATE CASCADE
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.student_attendance TO authenticated;
GRANT ALL ON public.student_attendance TO service_role;
ALTER TABLE public.student_attendance ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read their own profile" ON public.profiles FOR SELECT TO authenticated USING (user_id = auth.uid() OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Users can update their own profile" ON public.profiles FOR UPDATE TO authenticated USING (user_id = auth.uid() OR public.has_role(auth.uid(), 'admin')) WITH CHECK (user_id = auth.uid() OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins manage profiles" ON public.profiles FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Users can read their own role" ON public.user_roles FOR SELECT TO authenticated USING (user_id = auth.uid() OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Authenticated users read school settings" ON public.school_settings FOR SELECT TO authenticated USING (true);
CREATE POLICY "Admins manage school settings" ON public.school_settings FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Authenticated users read sessions" ON public.academic_sessions FOR SELECT TO authenticated USING (true);
CREATE POLICY "Admins manage sessions" ON public.academic_sessions FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Authenticated users read terms" ON public.academic_terms FOR SELECT TO authenticated USING (true);
CREATE POLICY "Admins manage terms" ON public.academic_terms FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Authenticated users read classes" ON public.school_classes FOR SELECT TO authenticated USING (true);
CREATE POLICY "Admins manage classes" ON public.school_classes FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Authenticated users read subjects" ON public.subjects FOR SELECT TO authenticated USING (true);
CREATE POLICY "Admins manage subjects" ON public.subjects FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins and assigned teachers read students" ON public.students FOR SELECT TO authenticated USING (
  public.has_role(auth.uid(), 'admin') OR EXISTS (
    SELECT 1 FROM public.teacher_assignments a
    WHERE a.class_name = students.class_name AND a.teacher_user_id = auth.uid()
  )
);
CREATE POLICY "Admins manage students" ON public.students FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Teachers read their assignments" ON public.teacher_assignments FOR SELECT TO authenticated USING (
  public.has_role(auth.uid(), 'admin') OR teacher_user_id = auth.uid()
);
CREATE POLICY "Admins manage assignments" ON public.teacher_assignments FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins and assigned teachers read scores" ON public.student_scores FOR SELECT TO authenticated USING (
  public.has_role(auth.uid(), 'admin') OR EXISTS (
    SELECT 1 FROM public.teacher_assignments a
    WHERE a.teacher_user_id = auth.uid() AND a.class_name = student_scores.class_name
      AND a.subject_code = student_scores.subject_code AND a.session_name = student_scores.session_name
      AND a.term_name = student_scores.term_name
  )
);
CREATE POLICY "Admins manage scores" ON public.student_scores FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Assigned teachers enter scores" ON public.student_scores FOR INSERT TO authenticated WITH CHECK (
  entered_by = auth.uid() AND EXISTS (
    SELECT 1 FROM public.teacher_assignments a
    WHERE a.teacher_user_id = auth.uid() AND a.class_name = student_scores.class_name
      AND a.subject_code = student_scores.subject_code AND a.session_name = student_scores.session_name
      AND a.term_name = student_scores.term_name
  )
);
CREATE POLICY "Assigned teachers update scores" ON public.student_scores FOR UPDATE TO authenticated USING (
  EXISTS (SELECT 1 FROM public.teacher_assignments a WHERE a.teacher_user_id = auth.uid()
    AND a.class_name = student_scores.class_name AND a.subject_code = student_scores.subject_code
    AND a.session_name = student_scores.session_name AND a.term_name = student_scores.term_name)
) WITH CHECK (
  entered_by = auth.uid() AND EXISTS (SELECT 1 FROM public.teacher_assignments a WHERE a.teacher_user_id = auth.uid()
    AND a.class_name = student_scores.class_name AND a.subject_code = student_scores.subject_code
    AND a.session_name = student_scores.session_name AND a.term_name = student_scores.term_name)
);
CREATE POLICY "Admins and assigned teachers read attendance" ON public.student_attendance FOR SELECT TO authenticated USING (
  public.has_role(auth.uid(), 'admin') OR EXISTS (SELECT 1 FROM public.teacher_assignments a
    WHERE a.teacher_user_id = auth.uid() AND a.class_name = student_attendance.class_name
      AND a.session_name = student_attendance.session_name AND a.term_name = student_attendance.term_name)
);
CREATE POLICY "Admins manage attendance" ON public.student_attendance FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Assigned teachers enter attendance" ON public.student_attendance FOR INSERT TO authenticated WITH CHECK (
  entered_by = auth.uid() AND EXISTS (SELECT 1 FROM public.teacher_assignments a WHERE a.teacher_user_id = auth.uid()
    AND a.class_name = student_attendance.class_name AND a.session_name = student_attendance.session_name
    AND a.term_name = student_attendance.term_name)
);
CREATE POLICY "Assigned teachers update attendance" ON public.student_attendance FOR UPDATE TO authenticated USING (
  EXISTS (SELECT 1 FROM public.teacher_assignments a WHERE a.teacher_user_id = auth.uid()
    AND a.class_name = student_attendance.class_name AND a.session_name = student_attendance.session_name
    AND a.term_name = student_attendance.term_name)
) WITH CHECK (
  entered_by = auth.uid() AND EXISTS (SELECT 1 FROM public.teacher_assignments a WHERE a.teacher_user_id = auth.uid()
    AND a.class_name = student_attendance.class_name AND a.session_name = student_attendance.session_name
    AND a.term_name = student_attendance.term_name)
);

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  granted_role public.app_role;
  profile_label TEXT;
BEGIN
  granted_role := CASE WHEN lower(COALESCE(NEW.email, '')) = 'enochfisayo434@gmail.com' THEN 'admin'::public.app_role ELSE 'teacher'::public.app_role END;
  profile_label := COALESCE(NULLIF(NEW.raw_user_meta_data ->> 'full_name', ''), NULLIF(NEW.raw_user_meta_data ->> 'name', ''), split_part(COALESCE(NEW.email, ''), '@', 1));
  INSERT INTO public.profiles (user_id, display_name, email) VALUES (NEW.id, profile_label, COALESCE(NEW.email, ''))
    ON CONFLICT (user_id) DO UPDATE SET email = EXCLUDED.email;
  INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, granted_role)
    ON CONFLICT (user_id) DO NOTHING;
  RETURN NEW;
END;
$$;
REVOKE ALL ON FUNCTION public.handle_new_user() FROM PUBLIC;
CREATE TRIGGER on_auth_user_created_edutrack AFTER INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

INSERT INTO public.profiles (user_id, display_name, email)
SELECT id, COALESCE(NULLIF(raw_user_meta_data ->> 'full_name', ''), NULLIF(raw_user_meta_data ->> 'name', ''), split_part(COALESCE(email, ''), '@', 1)), COALESCE(email, '') FROM auth.users
ON CONFLICT (user_id) DO NOTHING;
INSERT INTO public.user_roles (user_id, role)
SELECT id, CASE WHEN lower(COALESCE(email, '')) = 'enochfisayo434@gmail.com' THEN 'admin'::public.app_role ELSE 'teacher'::public.app_role END FROM auth.users
ON CONFLICT (user_id) DO NOTHING;

INSERT INTO public.school_settings (id, name, email, phone, address) VALUES (1, 'Bright Future College', 'info@brightfuture.edu.ng', '+234 801 234 5678', '123 Education Road, Lagos, Nigeria');
INSERT INTO public.academic_sessions (name, is_active) VALUES ('2026/2027', true), ('2025/2026', false), ('2024/2025', false);
INSERT INTO public.academic_terms (session_name, name, start_date, end_date, is_active) VALUES
('2026/2027', 'First Term', '2026-09-01', '2026-12-18', true),
('2026/2027', 'Second Term', '2027-01-11', '2027-04-09', false),
('2026/2027', 'Third Term', '2027-04-26', '2027-07-23', false),
('2025/2026', 'First Term', '2025-09-01', '2025-12-18', false),
('2025/2026', 'Second Term', '2026-01-12', '2026-04-10', false),
('2025/2026', 'Third Term', '2026-04-27', '2026-07-24', false),
('2024/2025', 'First Term', '2024-09-02', '2024-12-20', false),
('2024/2025', 'Second Term', '2025-01-13', '2025-04-11', false),
('2024/2025', 'Third Term', '2025-04-28', '2025-07-25', false);
INSERT INTO public.school_classes (name, level, arm) VALUES
('JSS1A','JSS1','A'),('JSS1B','JSS1','B'),('JSS2A','JSS2','A'),('JSS2B','JSS2','B'),('SS1A','SS1','A'),('SS1B','SS1','B'),('SS2A','SS2','A'),('SS2B','SS2','B');
INSERT INTO public.subjects (code, name) VALUES
('MTH','Mathematics'),('ENG','English Language'),('PHY','Physics'),('CHM','Chemistry'),('BIO','Biology'),('CIV','Civic Education');
INSERT INTO public.students (id, admission_no, name, class_name, age, gender) VALUES
('11111111-1111-4111-8111-111111111101','EDU-2036-0001','John Doe','SS1A',15,'Male'),
('11111111-1111-4111-8111-111111111102','EDU-2036-0002','Mary James','SS1A',16,'Female'),
('11111111-1111-4111-8111-111111111103','EDU-2036-0003','David Paul','SS1B',15,'Male'),
('11111111-1111-4111-8111-111111111104','EDU-2036-0004','Esther Okafor','SS2A',17,'Female'),
('11111111-1111-4111-8111-111111111105','EDU-2036-0005','Chinedu Nwosu','SS2B',16,'Male'),
('11111111-1111-4111-8111-111111111106','EDU-2036-0006','Aisha Bello','JSS2A',13,'Female'),
('11111111-1111-4111-8111-111111111107','EDU-2036-0007','Samuel Eze','JSS1A',11,'Male'),
('11111111-1111-4111-8111-111111111108','EDU-2036-0008','Fatima Musa','JSS1B',12,'Female');
INSERT INTO public.teacher_assignments (teacher_name, subject_code, class_name, session_name, term_name) VALUES
('Mr. John Doe','MTH','SS1A','2026/2027','First Term'),
('Mr. John Doe','MTH','SS1B','2026/2027','First Term'),
('Mr. John Doe','PHY','SS2A','2026/2027','First Term'),
('Mrs. Grace Ade','ENG','JSS1A','2026/2027','First Term'),
('Mrs. Ngozi Uche','BIO','SS1A','2026/2027','First Term');
INSERT INTO public.student_scores (student_id, class_name, subject_code, session_name, term_name, test_one, test_two, exam) VALUES
('11111111-1111-4111-8111-111111111101','SS1A','MTH','2026/2027','First Term',15,18,60),
('11111111-1111-4111-8111-111111111101','SS1A','ENG','2026/2027','First Term',14,17,54),
('11111111-1111-4111-8111-111111111101','SS1A','PHY','2026/2027','First Term',12,16,50),
('11111111-1111-4111-8111-111111111101','SS1A','CHM','2026/2027','First Term',13,15,48),
('11111111-1111-4111-8111-111111111101','SS1A','BIO','2026/2027','First Term',16,18,56),
('11111111-1111-4111-8111-111111111102','SS1A','MTH','2026/2027','First Term',12,16,55),
('11111111-1111-4111-8111-111111111103','SS1B','MTH','2026/2027','First Term',10,14,48),
('11111111-1111-4111-8111-111111111104','SS2A','MTH','2026/2027','First Term',8,12,45),
('11111111-1111-4111-8111-111111111105','SS2B','MTH','2026/2027','First Term',18,20,58);
INSERT INTO public.student_attendance (student_id, class_name, session_name, term_name, attendance_date, status) VALUES
('11111111-1111-4111-8111-111111111101','SS1A','2026/2027','First Term','2026-09-07','Present'),
('11111111-1111-4111-8111-111111111102','SS1A','2026/2027','First Term','2026-09-07','Present'),
('11111111-1111-4111-8111-111111111103','SS1B','2026/2027','First Term','2026-09-07','Absent'),
('11111111-1111-4111-8111-111111111104','SS2A','2026/2027','First Term','2026-09-07','Present'),
('11111111-1111-4111-8111-111111111105','SS2B','2026/2027','First Term','2026-09-07','Late');