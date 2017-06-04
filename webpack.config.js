var webpack = require('webpack');

module.exports = {
    entry: {
        'cascadeValidation': ['./src/scripts/CascadeValidation.ts'],
        'vendor': ['cascade']
    },
    output: {
        filename: './dist/bundle/[name].min.js',
        libraryTarget: 'var',
        library: '[name]'
    },
    resolve: {
        extensions: ['', '.webpack.js', '.web.js', '.ts', '.tsx', '.js']
    },
    externals: {
        mocha: 'mocha',
        chai: 'chai'
    },
    module: {
        loaders: [{
            test: /\.tsx?$/,
            loader: 'ts-loader'
        }]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin(),
        new webpack.optimize.CommonsChunkPlugin('vendor', './dist/bundle/vendor.bundle.js')
    ]
};
