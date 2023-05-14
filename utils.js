module.exports = {
  /**
   * Try parsing a string to json and remove some missformating like multiple quotes.
   * @param {*} str
   * @returns if the value can be parse it will return a json object else the function return the string passed
   */
  tryParseToJson: function (str) {
    try {
      const regexPatternToDetectJObject = /{[^{}]*}/;
      const jsonMatch = str.match(regexPatternToDetectJObject);
      if (jsonMatch) {
        const jsonString = jsonMatch[0];
        const parsedObject = JSON.parse(jsonString.replace(/""/g, '"')); //Need to replace "" by ". missformating?
        return parsedObject;
      }
    } catch (e) {
      console.error(`tryParseToJson input: ${str} error: `, e);
    }
    return str;
  },
  /**
   * Compare a record with a set of records to determine if the record is the latest. If records is empty the first record is set as reference.
   * @param {*} records
   * @param {*} record
   * @param {*} userIdSchemaIndex
   * @param {*} creationDateSchemaIndex
   * @param {*} createdAtColumnName
   * @returns true if is the lastest else false
   */
  isLatestRecord: function (
    records,
    record,
    userIdSchemaIndex,
    creationDateSchemaIndex,
    createdAtColumnName,
  ) {
    if (
      userIdSchemaIndex !== -1 &&
      creationDateSchemaIndex !== -1 &&
      record.length
    ) {
      const userId = record[userIdSchemaIndex];
      const creationDate = new Date(record[creationDateSchemaIndex]);
      return (
        !records[userId] ||
        creationDate.getTime() >
          new Date(records[userId][createdAtColumnName]).getTime() //check for record dates
      );
    }
    return false;
  },
  /**
   * add a record to a set of records based on a schema and the index of the user id of this schema
   * @param {*} records
   * @param {*} record
   * @param {*} schema
   * @param {*} userIdSchemaIndex
   * @returns the set of records even if its modified by reference
   */
  addRecord: function (records, record, schema, userIdSchemaIndex) {
    const userProfile = {};
    for (let j = 0; j < record.length; j++) {
      userProfile[schema[j]] = this.tryParseToJson(record[j]);
    }
    const userId = record[userIdSchemaIndex];
    records[userId] = userProfile;
    return records;
  },
};
