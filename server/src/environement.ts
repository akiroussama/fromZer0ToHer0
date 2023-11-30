import { load } from 'ts-dotenv';

const env = load({
  JWT_PRIVATE_KEY: String,
});

export default env;
