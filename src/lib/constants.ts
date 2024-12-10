

 enum Role{
  ADMIN ,
  MODIFIER,
  USER
}
export const permissions={
  "user":[Role.ADMIN],
  "record.create":[Role.ADMIN,Role.MODIFIER],
  "record.edit":[Role.ADMIN,Role.MODIFIER],
  "record.read":[Role.ADMIN,Role.MODIFIER,Role.USER]
}
export type PermissionName=keyof typeof permissions








