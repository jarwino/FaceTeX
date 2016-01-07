mathmode
========
This node.js module turns LaTeX math mode expressions into images.

Example
=======
The following one-liner will write a png image of the famous Euler identity to stdout:

    require("mathmode")("e^{i \\pi} = -1").pipe(process.stdout)

Here is what the result should look like:

<img src=https://raw.github.com/mikolalysenko/mathmode/master/example/simple.png>

Installation
============

This code uses the `preview` LaTeX environment and GraphicsMagick, which you will need to install.  To do this on Debian, use the following command:

    sudo apt-get install texlive texlive-latex-extra imagemagick

On OS X, you can do this using MacPorts:

    sudo port install texlive texlive-latex-extra imagemagick
    
I have no idea how to do any of this on Windows or if this package will even work at all in that environment. If you do know how to use Windows, please open an issue/pull request with a fix.

Once all that is done, you can then install the npm package directly:

    npm install mathmode

There is only one function in the module, which is the following:


`require("mathmode")(expr[, options])`
--------------------------------------

Turns the LaTeX expression `expr` into an image encoded as a stream.  You can tweak this behavior a bit by specifying extra parameters via the `options` struct:

* `dpi`: Dots-per-inch determines the resolution of resulting image.  Default: 300
* `format`:  Resulting image format. Default `png`
* `packages`: A list of extra LaTeX packages to include.  Default `["amsmath"]`
* `macros`: A list of LaTeX preprocessor macros.  Default `""`
* `pdflatex_path`: A path the `pdflatex` executable.  Default: `pdflatex`
* `imagemagick_path`: A path to Graphics Magic.  Default `convert`

The result is a stream object for the resulting image.


Acknowledgements
================
(c) 2013 Mikola Lysenko.  MIT License
