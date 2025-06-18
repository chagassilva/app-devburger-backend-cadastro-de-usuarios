

const allowedOrigins = [
  'http://localhost:5173',
  'https://app-devburger-frontend.vercel.app',
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin) return callback(null, true); // permite ferramentas internas (Postman, etc.)

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
};