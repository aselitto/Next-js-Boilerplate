CREATE TABLE IF NOT EXISTS "user_ocr" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" varchar(255) NOT NULL,
	"first_name" varchar(100) NOT NULL,
	"last_name" varchar(100) NOT NULL,
	"scan_data" varchar(1000),
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "user_ocr_email_unique" UNIQUE("email")
);
--> statement-breakpoint
DROP TABLE "counter";