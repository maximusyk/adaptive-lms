import { addPostcssPlugins, fixBabelImports, override } from 'customize-cra';
import tailwindcss from 'tailwindcss';

export default override(
    fixBabelImports('import', {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: 'css',
    }),
    addPostcssPlugins([tailwindcss])
);