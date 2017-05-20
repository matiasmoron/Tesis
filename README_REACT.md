npm install --save babel-core
npm install --save babel-preset-latest
npm install --save babel-preset-react
npm install --save webpack babel-loader
npm install --save express webpack-dev-middleware
npm install --save react react-dom

////////INSTALAR SASS////////
npm install create-react-app-sass --save-dev

En package.json modificar el anterior start por start-js 
y crear :
"start": "react-scripts-with-sass start",
"build": "react-scripts-with-sass build"

luego hacer:
npm init -y

agregar al gitignore *.css

Eliminar bundle.js ACORDARSEEE!!!!!!


Para las router react-router-dom;
