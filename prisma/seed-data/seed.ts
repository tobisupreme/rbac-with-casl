import { PrismaClient } from '@prisma/client';

export const roles = [
  {
    id: 1,
    name: 'Admin',
    code: 'admin',
  },
  {
    id: 2,
    name: 'User',
    code: 'user',
  },
  {
    id: 3,
    name: 'Control',
    code: 'control',
  },
  {
    id: 4,
    name: 'It',
    code: 'it',
  },
  {
    id: 5,
    name: 'Manager',
    code: 'manager',
  },
];

export const objects = [
  {
    id: 1,
    name: 'Transactions',
    code: 'transactions',
  },
  {
    id: 2,
    name: 'Dashboard',
    code: 'dashboard',
  },
  {
    id: 3,
    name: 'Admin',
    code: 'admin',
  },
  {
    id: 4,
    name: 'ApiKeys',
    code: 'api-keys',
  },
  {
    id: 5,
    name: 'Webhooks',
    code: 'webhooks',
  },
  {
    id: 6,
    name: 'Users',
    code: 'users',
  },
];

export const permissions = [
  {
    id: 1,
    roleId: 1,
    action: 'manage',
    subject: 'all',
  },
  {
    id: 2,
    roleId: 2,
    action: 'read',
    subject: 'transactions',
    objectId: 2,
  },
  {
    id: 3,
    roleId: 5,
    action: 'manage',
    subject: 'transactions',
    objectId: 2,
    // conditions: { created_by: '{{ id }}' },
  },
  {
    id: 4,
    roleId: 4,
    action: 'manage',
    subject: 'api-keys',
    objectId: 3,
  },
  {
    id: 4,
    roleId: 4,
    action: 'manage',
    subject: 'webhooks',
    objectId: 5,
  },
];

export const users = [
  {
    id: 1,
    roleId: 1,
    email: 'billy@yopmail.com',
  },
  {
    id: 2,
    roleId: 2,
    email: 'bennison@yopmail.com',
  },
];

const prisma = new PrismaClient();

async function main() {
  for await (const { id, ...object } of objects) {
    await prisma.object.upsert({
      where: { id },
      create: object,
      update: object,
    });
  }

  for await (const { id, ...role } of roles) {
    await prisma.role.upsert({
      where: { id },
      create: role,
      update: role,
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  for await (const { id, roleId, subject, ...permission } of permissions) {
    await prisma.permission.upsert({
      where: { id },
      create: permission,
      update: permission,
    });
  }

  for await (const { id, ...user } of users) {
    await prisma.user.upsert({
      where: { id },
      create: user,
      update: user,
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  for await (const { id, roleId, subject, ...permission } of permissions) {
    await prisma.permission.upsert({
      where: { id },
      create: { ...permission },
      update: { ...permission },
    });
  }

  await prisma.rolePermission.createMany({
    skipDuplicates: true,
    data: permissions.map(({ id, roleId }) => ({
      permissionId: id,
      roleId,
    })),
  });
}

main()
  .then(async () => {
    console.log('seeding done');
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.log(error);
    await prisma.$disconnect();
  });
