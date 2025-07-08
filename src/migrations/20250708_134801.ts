import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."_locales" AS ENUM('en', 'fr');
  CREATE TYPE "public"."enum_product_options_values_delta_type" AS ENUM('price', 'weight', 'temperature', 'volume', 'time');
  CREATE TYPE "public"."enum_product_options_values_delta_unit" AS ENUM('€', '%');
  CREATE TYPE "public"."enum_product_advanced_values_delta_type" AS ENUM('price', 'weight', 'temperature', 'volume', 'time');
  CREATE TYPE "public"."enum_product_advanced_values_delta_unit" AS ENUM('€', '%');
  CREATE TABLE "bloc_info" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "bloc_info_locales" (
  	"title" varchar NOT NULL,
  	"content" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "category" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"slug" varchar,
  	"active" boolean DEFAULT true,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "category_locales" (
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "color" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"color" varchar DEFAULT '#FFFFFF',
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"alt" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric
  );
  
  CREATE TABLE "product_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer
  );
  
  CREATE TABLE "product_colors" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"default" boolean DEFAULT false,
  	"color_id" integer NOT NULL,
  	"image_id" integer
  );
  
  CREATE TABLE "product_colors_secondary" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"default" boolean DEFAULT false,
  	"color_id" integer NOT NULL,
  	"image_id" integer
  );
  
  CREATE TABLE "product_options_values_delta" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"type" "enum_product_options_values_delta_type" NOT NULL,
  	"value" numeric NOT NULL,
  	"unit" "enum_product_options_values_delta_unit" NOT NULL
  );
  
  CREATE TABLE "product_options_values" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"default_value" boolean,
  	"image_id" integer,
  	"value" varchar
  );
  
  CREATE TABLE "product_options_values_locales" (
  	"title" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "product_options" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "product_options_locales" (
  	"title" varchar NOT NULL,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "product_advanced_values_delta" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"type" "enum_product_advanced_values_delta_type" NOT NULL,
  	"value" numeric NOT NULL,
  	"unit" "enum_product_advanced_values_delta_unit" NOT NULL
  );
  
  CREATE TABLE "product_advanced_values" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"default_value" boolean,
  	"image_id" integer,
  	"value" varchar
  );
  
  CREATE TABLE "product_advanced_values_locales" (
  	"title" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "product_advanced" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "product_advanced_locales" (
  	"title" varchar NOT NULL,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "product_technical_infos" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "product_technical_infos_locales" (
  	"title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "product_materials" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "product_materials_locales" (
  	"title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "product_care" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "product_care_locales" (
  	"title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "product" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"category_id" integer NOT NULL,
  	"title" varchar NOT NULL,
  	"slug" varchar,
  	"size_guide_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "product_locales" (
  	"description" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "product_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"bloc_info_id" integer
  );
  
  CREATE TABLE "size_guide" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"rows" numeric NOT NULL,
  	"cols" numeric NOT NULL,
  	"table" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"bloc_info_id" integer,
  	"category_id" integer,
  	"color_id" integer,
  	"media_id" integer,
  	"product_id" integer,
  	"size_guide_id" integer,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "message" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"message" jsonb NOT NULL,
  	"image_id" integer,
  	"active" boolean DEFAULT true,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "nav_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer
  );
  
  CREATE TABLE "nav_items_locales" (
  	"title" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "nav" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "nav_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"category_id" integer
  );
  
  ALTER TABLE "bloc_info_locales" ADD CONSTRAINT "bloc_info_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."bloc_info"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "category_locales" ADD CONSTRAINT "category_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."category"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "product_images" ADD CONSTRAINT "product_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "product_images" ADD CONSTRAINT "product_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."product"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "product_colors" ADD CONSTRAINT "product_colors_color_id_color_id_fk" FOREIGN KEY ("color_id") REFERENCES "public"."color"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "product_colors" ADD CONSTRAINT "product_colors_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "product_colors" ADD CONSTRAINT "product_colors_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."product"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "product_colors_secondary" ADD CONSTRAINT "product_colors_secondary_color_id_color_id_fk" FOREIGN KEY ("color_id") REFERENCES "public"."color"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "product_colors_secondary" ADD CONSTRAINT "product_colors_secondary_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "product_colors_secondary" ADD CONSTRAINT "product_colors_secondary_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."product"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "product_options_values_delta" ADD CONSTRAINT "product_options_values_delta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."product_options_values"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "product_options_values" ADD CONSTRAINT "product_options_values_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "product_options_values" ADD CONSTRAINT "product_options_values_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."product_options"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "product_options_values_locales" ADD CONSTRAINT "product_options_values_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."product_options_values"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "product_options" ADD CONSTRAINT "product_options_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."product"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "product_options_locales" ADD CONSTRAINT "product_options_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."product_options"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "product_advanced_values_delta" ADD CONSTRAINT "product_advanced_values_delta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."product_advanced_values"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "product_advanced_values" ADD CONSTRAINT "product_advanced_values_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "product_advanced_values" ADD CONSTRAINT "product_advanced_values_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."product_advanced"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "product_advanced_values_locales" ADD CONSTRAINT "product_advanced_values_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."product_advanced_values"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "product_advanced" ADD CONSTRAINT "product_advanced_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."product"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "product_advanced_locales" ADD CONSTRAINT "product_advanced_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."product_advanced"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "product_technical_infos" ADD CONSTRAINT "product_technical_infos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."product"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "product_technical_infos_locales" ADD CONSTRAINT "product_technical_infos_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."product_technical_infos"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "product_materials" ADD CONSTRAINT "product_materials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."product"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "product_materials_locales" ADD CONSTRAINT "product_materials_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."product_materials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "product_care" ADD CONSTRAINT "product_care_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."product"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "product_care_locales" ADD CONSTRAINT "product_care_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."product_care"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "product" ADD CONSTRAINT "product_category_id_category_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."category"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "product" ADD CONSTRAINT "product_size_guide_id_size_guide_id_fk" FOREIGN KEY ("size_guide_id") REFERENCES "public"."size_guide"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "product_locales" ADD CONSTRAINT "product_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."product"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "product_rels" ADD CONSTRAINT "product_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."product"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "product_rels" ADD CONSTRAINT "product_rels_bloc_info_fk" FOREIGN KEY ("bloc_info_id") REFERENCES "public"."bloc_info"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_bloc_info_fk" FOREIGN KEY ("bloc_info_id") REFERENCES "public"."bloc_info"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_category_fk" FOREIGN KEY ("category_id") REFERENCES "public"."category"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_color_fk" FOREIGN KEY ("color_id") REFERENCES "public"."color"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_product_fk" FOREIGN KEY ("product_id") REFERENCES "public"."product"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_size_guide_fk" FOREIGN KEY ("size_guide_id") REFERENCES "public"."size_guide"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "message" ADD CONSTRAINT "message_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "nav_items" ADD CONSTRAINT "nav_items_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "nav_items" ADD CONSTRAINT "nav_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."nav"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "nav_items_locales" ADD CONSTRAINT "nav_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."nav_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "nav_rels" ADD CONSTRAINT "nav_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."nav"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "nav_rels" ADD CONSTRAINT "nav_rels_category_fk" FOREIGN KEY ("category_id") REFERENCES "public"."category"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "bloc_info_updated_at_idx" ON "bloc_info" USING btree ("updated_at");
  CREATE INDEX "bloc_info_created_at_idx" ON "bloc_info" USING btree ("created_at");
  CREATE UNIQUE INDEX "bloc_info_locales_locale_parent_id_unique" ON "bloc_info_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "category_updated_at_idx" ON "category" USING btree ("updated_at");
  CREATE INDEX "category_created_at_idx" ON "category" USING btree ("created_at");
  CREATE UNIQUE INDEX "category_locales_locale_parent_id_unique" ON "category_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "color_updated_at_idx" ON "color" USING btree ("updated_at");
  CREATE INDEX "color_created_at_idx" ON "color" USING btree ("created_at");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX "product_images_order_idx" ON "product_images" USING btree ("_order");
  CREATE INDEX "product_images_parent_id_idx" ON "product_images" USING btree ("_parent_id");
  CREATE INDEX "product_images_image_idx" ON "product_images" USING btree ("image_id");
  CREATE INDEX "product_colors_order_idx" ON "product_colors" USING btree ("_order");
  CREATE INDEX "product_colors_parent_id_idx" ON "product_colors" USING btree ("_parent_id");
  CREATE INDEX "product_colors_color_idx" ON "product_colors" USING btree ("color_id");
  CREATE INDEX "product_colors_image_idx" ON "product_colors" USING btree ("image_id");
  CREATE INDEX "product_colors_secondary_order_idx" ON "product_colors_secondary" USING btree ("_order");
  CREATE INDEX "product_colors_secondary_parent_id_idx" ON "product_colors_secondary" USING btree ("_parent_id");
  CREATE INDEX "product_colors_secondary_color_idx" ON "product_colors_secondary" USING btree ("color_id");
  CREATE INDEX "product_colors_secondary_image_idx" ON "product_colors_secondary" USING btree ("image_id");
  CREATE INDEX "product_options_values_delta_order_idx" ON "product_options_values_delta" USING btree ("_order");
  CREATE INDEX "product_options_values_delta_parent_id_idx" ON "product_options_values_delta" USING btree ("_parent_id");
  CREATE INDEX "product_options_values_order_idx" ON "product_options_values" USING btree ("_order");
  CREATE INDEX "product_options_values_parent_id_idx" ON "product_options_values" USING btree ("_parent_id");
  CREATE INDEX "product_options_values_image_idx" ON "product_options_values" USING btree ("image_id");
  CREATE UNIQUE INDEX "product_options_values_locales_locale_parent_id_unique" ON "product_options_values_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "product_options_order_idx" ON "product_options" USING btree ("_order");
  CREATE INDEX "product_options_parent_id_idx" ON "product_options" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "product_options_locales_locale_parent_id_unique" ON "product_options_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "product_advanced_values_delta_order_idx" ON "product_advanced_values_delta" USING btree ("_order");
  CREATE INDEX "product_advanced_values_delta_parent_id_idx" ON "product_advanced_values_delta" USING btree ("_parent_id");
  CREATE INDEX "product_advanced_values_order_idx" ON "product_advanced_values" USING btree ("_order");
  CREATE INDEX "product_advanced_values_parent_id_idx" ON "product_advanced_values" USING btree ("_parent_id");
  CREATE INDEX "product_advanced_values_image_idx" ON "product_advanced_values" USING btree ("image_id");
  CREATE UNIQUE INDEX "product_advanced_values_locales_locale_parent_id_unique" ON "product_advanced_values_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "product_advanced_order_idx" ON "product_advanced" USING btree ("_order");
  CREATE INDEX "product_advanced_parent_id_idx" ON "product_advanced" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "product_advanced_locales_locale_parent_id_unique" ON "product_advanced_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "product_technical_infos_order_idx" ON "product_technical_infos" USING btree ("_order");
  CREATE INDEX "product_technical_infos_parent_id_idx" ON "product_technical_infos" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "product_technical_infos_locales_locale_parent_id_unique" ON "product_technical_infos_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "product_materials_order_idx" ON "product_materials" USING btree ("_order");
  CREATE INDEX "product_materials_parent_id_idx" ON "product_materials" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "product_materials_locales_locale_parent_id_unique" ON "product_materials_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "product_care_order_idx" ON "product_care" USING btree ("_order");
  CREATE INDEX "product_care_parent_id_idx" ON "product_care" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "product_care_locales_locale_parent_id_unique" ON "product_care_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "product_category_idx" ON "product" USING btree ("category_id");
  CREATE INDEX "product_size_guide_idx" ON "product" USING btree ("size_guide_id");
  CREATE INDEX "product_updated_at_idx" ON "product" USING btree ("updated_at");
  CREATE INDEX "product_created_at_idx" ON "product" USING btree ("created_at");
  CREATE UNIQUE INDEX "product_locales_locale_parent_id_unique" ON "product_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "product_rels_order_idx" ON "product_rels" USING btree ("order");
  CREATE INDEX "product_rels_parent_idx" ON "product_rels" USING btree ("parent_id");
  CREATE INDEX "product_rels_path_idx" ON "product_rels" USING btree ("path");
  CREATE INDEX "product_rels_bloc_info_id_idx" ON "product_rels" USING btree ("bloc_info_id");
  CREATE INDEX "size_guide_updated_at_idx" ON "size_guide" USING btree ("updated_at");
  CREATE INDEX "size_guide_created_at_idx" ON "size_guide" USING btree ("created_at");
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_bloc_info_id_idx" ON "payload_locked_documents_rels" USING btree ("bloc_info_id");
  CREATE INDEX "payload_locked_documents_rels_category_id_idx" ON "payload_locked_documents_rels" USING btree ("category_id");
  CREATE INDEX "payload_locked_documents_rels_color_id_idx" ON "payload_locked_documents_rels" USING btree ("color_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_product_id_idx" ON "payload_locked_documents_rels" USING btree ("product_id");
  CREATE INDEX "payload_locked_documents_rels_size_guide_id_idx" ON "payload_locked_documents_rels" USING btree ("size_guide_id");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");
  CREATE INDEX "message_image_idx" ON "message" USING btree ("image_id");
  CREATE INDEX "nav_items_order_idx" ON "nav_items" USING btree ("_order");
  CREATE INDEX "nav_items_parent_id_idx" ON "nav_items" USING btree ("_parent_id");
  CREATE INDEX "nav_items_image_idx" ON "nav_items" USING btree ("image_id");
  CREATE UNIQUE INDEX "nav_items_locales_locale_parent_id_unique" ON "nav_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "nav_rels_order_idx" ON "nav_rels" USING btree ("order");
  CREATE INDEX "nav_rels_parent_idx" ON "nav_rels" USING btree ("parent_id");
  CREATE INDEX "nav_rels_path_idx" ON "nav_rels" USING btree ("path");
  CREATE INDEX "nav_rels_category_id_idx" ON "nav_rels" USING btree ("category_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "bloc_info" CASCADE;
  DROP TABLE "bloc_info_locales" CASCADE;
  DROP TABLE "category" CASCADE;
  DROP TABLE "category_locales" CASCADE;
  DROP TABLE "color" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "product_images" CASCADE;
  DROP TABLE "product_colors" CASCADE;
  DROP TABLE "product_colors_secondary" CASCADE;
  DROP TABLE "product_options_values_delta" CASCADE;
  DROP TABLE "product_options_values" CASCADE;
  DROP TABLE "product_options_values_locales" CASCADE;
  DROP TABLE "product_options" CASCADE;
  DROP TABLE "product_options_locales" CASCADE;
  DROP TABLE "product_advanced_values_delta" CASCADE;
  DROP TABLE "product_advanced_values" CASCADE;
  DROP TABLE "product_advanced_values_locales" CASCADE;
  DROP TABLE "product_advanced" CASCADE;
  DROP TABLE "product_advanced_locales" CASCADE;
  DROP TABLE "product_technical_infos" CASCADE;
  DROP TABLE "product_technical_infos_locales" CASCADE;
  DROP TABLE "product_materials" CASCADE;
  DROP TABLE "product_materials_locales" CASCADE;
  DROP TABLE "product_care" CASCADE;
  DROP TABLE "product_care_locales" CASCADE;
  DROP TABLE "product" CASCADE;
  DROP TABLE "product_locales" CASCADE;
  DROP TABLE "product_rels" CASCADE;
  DROP TABLE "size_guide" CASCADE;
  DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TABLE "message" CASCADE;
  DROP TABLE "nav_items" CASCADE;
  DROP TABLE "nav_items_locales" CASCADE;
  DROP TABLE "nav" CASCADE;
  DROP TABLE "nav_rels" CASCADE;
  DROP TYPE "public"."_locales";
  DROP TYPE "public"."enum_product_options_values_delta_type";
  DROP TYPE "public"."enum_product_options_values_delta_unit";
  DROP TYPE "public"."enum_product_advanced_values_delta_type";
  DROP TYPE "public"."enum_product_advanced_values_delta_unit";`)
}
