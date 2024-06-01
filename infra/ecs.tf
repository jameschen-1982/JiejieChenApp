#module "ecs" {
#  source = "terraform-aws-modules/ecs/aws"
#
#  cluster_name = "jiejiechen-ecs-cluster"
#
#  cluster_configuration = {
#    execute_command_configuration = {
#      logging           = "OVERRIDE"
#      log_configuration = {
#        cloud_watch_log_group_name = "/aws/ecs/aws-ec2"
#      }
#    }
#  }
#
#  fargate_capacity_providers = {
#    FARGATE = {
#      default_capacity_provider_strategy = {
#        weight = 50
#      }
#    }
#    FARGATE_SPOT = {
#      default_capacity_provider_strategy = {
#        weight = 50
#      }
#    }
#  }
#
#  services = {
#    jiejiechen-cms = {
#      cpu    = 1024
#      memory = 4096
#
#      # Container definition(s)
#      container_definitions = {
#        ecs-sample = {
#          cpu           = 512
#          memory        = 1024
#          essential     = true
#          image         = "${aws_ecr_repository.jiejiechen-cms.repository_url}:latest"
#          port_mappings = [
#            {
#              name          = "jiejiechen-cms"
#              containerPort = 1377
#              protocol      = "http"
#            }
#          ]
#
#          # Example image used requires access to write to root filesystem
#          readonly_root_filesystem = false
#
#          enable_cloudwatch_logging = false
#          memory_reservation = 100
#        }
#      }
#
#      service_connect_configuration = {
#        namespace = "jiejiechen-cms"
#        service   = {
#          client_alias = {
#            port     = 80
#            dns_name = "jiejiechen-cms"
#          }
#          port_name      = "jiejiechen-cms"
#          discovery_name = "jiejiechen-cms"
#        }
#      }
#
#      load_balancer = {
#        service = {
#          target_group_arn = module.alb.arn
#          container_name   = "ecs-sample"
#          container_port   = 80
#        }
#      }
#
#      subnet_ids           = module.vpc.private_subnets
#      security_group_rules = {
#        alb_ingress_3000 = {
#          type                     = "ingress"
#          from_port                = 80
#          to_port                  = 80
#          protocol                 = "tcp"
#          description              = "Service port"
#          source_security_group_id = "sg-12345678"
#        }
#        egress_all = {
#          type        = "egress"
#          from_port   = 0
#          to_port     = 0
#          protocol    = "-1"
#          cidr_blocks = ["0.0.0.0/0"]
#        }
#      }
#    }
#  }
#
#  tags = {
#    Environment = "Development"
#    Project     = "Example"
#  }
#}