const sequelize = new Sequelize(
  process.env.DATABASE_URL ||
  `postgresql://postgres:${encodeURIComponent(
      process.env.PASS
    )}@localhost/fishingagain`, {
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false, // very important
      },
    },
  }
);