# The CMS database was backed up and replaced with a static website.
# Preserve all module-owned resources without Terraform deleting them when
# reconciling the old state. The DB instance itself is retired separately
# after the stopped-instance validation and final snapshot review.
removed {
  from = module.db

  lifecycle {
    destroy = false
  }
}
