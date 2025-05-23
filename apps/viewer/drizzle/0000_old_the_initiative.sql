CREATE TABLE "transcripts" (
	"id" uuid PRIMARY KEY NOT NULL,
	"content" text NOT NULL,
	"project_path" varchar(500),
	"summary" text,
	"uploaded_at" timestamp DEFAULT now() NOT NULL,
	"file_size" integer NOT NULL,
	"message_count" integer
);
