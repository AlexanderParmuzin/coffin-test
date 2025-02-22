const dbsConfig = require("../config");
const connectionFactory = require("../DB/sample-db/index");
const logger = require("./logger.service")(module);

/**
 * Базовый класс сервиса работы с базой данных
 */
class Database {
  #uri;

  #id;

  #database;

  #connection;

  #models

  constructor(config) {
    this.#uri = config.uri;
    this.#id = config.id;
    this.#database = config.database;
  }

  /**
   * Открывает соединение с БД.
   * @return {Promise<void>}
   */
  async connect() {
    const connectUrl = `${this.#uri}/${this.#database}`;
    // const connectUrl = `mongodb://localhost:27017/coffin`;

    try {
      this.#connection = await connectionFactory(connectUrl);
      this.#models = this.#connection?.models;
      // this.#connection = await mongoose.connect(`${this.#uri}/${this.#database}`);
      logger.info(`Connected to ${this.#id}`);
    } catch (error) {
      logger.error(`Unable to connect to ${this.#id}:`, error.message);
    }
  }

  /**
   * Закрывает соединение с БД.
   * @return {Promise<void>}
   */
  async disconnect() {
    if (this.#connection) {
      try {
        this.#connection.disconnect();
        logger.info(`Disconnected from ${this.#id}`);
      } catch (error) {
        logger.error(`Unable to disconnect from ${this.#id}:`, error.message);
      }
    }
  }

  /**
   * Возвращает объект соединения с БД,
   * @return {Object}
   */
  get connection() {
    return this.#connection;
  }

  /**
   * Возвращает инициализированные модели,
   * @return {Object}
   */
  get models() {
    return this.#models;
  }
}

const sampleDB = new Database(dbsConfig);

module.exports = { sampleDB };
