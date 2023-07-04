const handlebars = require('handlebars');
const fs = require('fs-extra');

// Set the input and output directories
const inputDirectory = './templates/'; // Path to the folder containing Handlebars templates
const outputDirectory = './output/'; // Path to the folder where the converted HTML files will be saved

// Read the Handlebars templates from the input directory
fs.readdir(inputDirectory, (err, files) => {
  if (err) {
    console.error('Error reading input directory:', err);
    return;
  }

  // Filter out non-template files
  const templateFiles = files.filter(file => file.endsWith('.hbs'));

  // Loop through each Handlebars template
  templateFiles.forEach(file => {
    // Read the contents of the template
    const templateFilePath = inputDirectory + file;
    fs.readFile(templateFilePath, 'utf8', (err, data) => {
      if (err) {
        console.error('Error reading file:', err);
        return;
      }

      // Compile the Handlebars template
      const compiledTemplate = handlebars.compile(data);

      // Render the template to HTML
      const html = compiledTemplate();

      // Write the HTML to the output file
      const outputFilePath = outputDirectory + file.replace('.hbs', '.html');
      fs.writeFile(outputFilePath, html, 'utf8', err => {
        if (err) {
          console.error('Error writing file:', err);
        } else {
          console.log(`Converted ${file} to ${outputFilePath}`);
        }
      });
    });
  });
});