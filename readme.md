# User Profile Extraction

This Node.js script extracts the most recent user profiles from a CSV file based on the provided configuration. The extracted records are saved as a JSON file.

## Dependencies

- fs: File system module in Node.js for file operations.
- readline: Module in Node.js for reading data line-by-line.
- utils: Custom utility functions for processing the CSV data.

## Configuration

You can configure the script by modifying the `CONFIG` object in the code or by passing command-line arguments. The available configuration options are:

- `csvFilePath`: The path to the CSV file to be parsed. Default: `./data.csv`.Example: node app.js csvFilePath="./data.json"
- `outputFilePath`: The path to the output JSON file. Default: `./user.json`. Example: node app.js outputFilePath="./user v2.json"
- `userIdColumnName`: The name of the column that contains the user ID. Default: `uid`. Example: node app.js userIdColumnName="uid"
- `createdAtColumnName`: The name of the column that contains the creation date. Default: `createdAt`. Example: node app.js createdAtColumnName="createdAt"

To pass command-line arguments, use the format `key=value`. For example:

```
node script.js csvFilePath=./data.csv outputFilePath=./output.json
```

## Execution

The script reads the CSV file line by line using the `readline` module. It performs the following steps:

1. Set up the necessary variables and configuration based on the provided options.
2. Read each line of the CSV file.
3. Determine the CSV header and extract the schema information.
4. Parse each line of the CSV and check if it represents a more recent user profile.
5. Store the most recent user profiles in the `USERPROFILES` object.
6. Write the extracted user profiles to the output JSON file specified in the configuration.

## Usage

1. Install the required dependencies by running the following command:

```
npm install fs readline
```

2. Run the script using the Node.js command:

```
node app.js [arguments]
```

Replace `[arguments]` with the desired configuration options in the format `key=value`. The available options are `csvFilePath`, `outputFilePath`, `userIdColumnName`, and `createdAtColumnName`.

3. The script will log the execution time and the number of extracted records to the console. The output JSON file will contain the extracted user profiles.

Note: Make sure to replace `app.js` with the actual filename of the script.

Feel free to customize the configuration options and adapt the script to fit your specific needs.
