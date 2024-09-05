
module "db" {
  source = "terraform-aws-modules/rds/aws"

  identifier = "jiejiechen-db"

  engine            = "postgres"
  engine_version    = "14"
  instance_class    = "db.t4g.micro"
  allocated_storage = 20

  db_name  = "strapi_db"
  username = "postgresuser"
  port     = "5432"

  iam_database_authentication_enabled = true

  maintenance_window = "Mon:00:00-Mon:03:00"
  backup_window      = "03:00-06:00"

  # Enhanced Monitoring - see example for details on how to create the role
  # by yourself, in case you don't want to create it automatically
  monitoring_interval    = "30"
  monitoring_role_name   = "MyRDSMonitoringRole"
  create_monitoring_role = true
  

  # DB subnet group
  create_db_subnet_group = false
  subnet_ids             = module.vpc.public_subnets # some problem with vpc here

  vpc_security_group_ids = ["sg-a18564c4"]

  # DB parameter group
  family = "postgres14"

  # DB option group
  major_engine_version = "14"

  # Database Deletion Protection
  deletion_protection = true

  publicly_accessible = true

  parameters = [
    {
      name  = "autovacuum"
      value = 1
    },
    {
      name  = "client_encoding"
      value = "utf8"
    }
  ]

  db_parameter_group_tags = {
    "Sensitive" = "low"
  }
}
