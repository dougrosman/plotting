# Letter Writer

I want to create a simple web app in the "letter_writer" folder that will be used for pen plotting.

## Features

This app should have the following features:

1. A text box where I can paste in markdown or plain text. If markdown is pasted in, the only style that should matter is italicized text. If there is italicized text, use an italic version of the selected typeface (if it exists)
2. a dropdown where i can select a single stroke font. take the fonts from the fonts folder included here.
3. when i select a font, the text should automatically re-render with the new font
4. formatting options to control:
   1. font size
   2. padding (top and bottom)
   3. padding (left and right)
   4. line height
   5. output document width and height (in inches)
   6. a DPI slider (default 96)
5. A save button that exports the file as an SVG file ready for plotting
6. The output file should be rotated 90 degrees to account for the plotter orientation. The plotter (an axidraw V3) plots in landscape orientation.

## Technical specs:

1. use the p5.js, p5.plotSVG.js and SvgFont.js libraries in the folder