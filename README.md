# create-vite-hyperapp

Quickly scaffold new web-frontend projects using the [Hyperapp](https://hyperapp.dev) microframework, using the [Vite](https://vitejs.dev) bundler.

## Usage

With your shell in the folder _under which_ you would like to create your new project folder, run `npm create vite-hyperapp` and answer the questions. 

To skip questions and do the entire setup directly in the command line, use the options:

```
Usage: npm create vite-hyperapp -- [TARGET_DIR] [OPTIONS]

Options:
    -t, --typescript      Use typescript
    -s, --ssr             Use server-side rendering
    -n, --no-prompt       Just do it, no questions asked
    -h, --help            Show this message 

If no target dir is specified, the project name will be used.
If --no-prompt option is used, project name will be target dir
Default project-name/target-dir is 'hyperapp-project'
```

## About the scaffolds

There are four basic templates that can be scaffolded up, depending on wether you want to use Typescript or not, and if you want to scaffold your project for SSR or not. 

The vite-hyperapp connection is provided by [vite-plugin-hyperapp](https://github.com/zaceno/vite-plugin-hyperapp).

The SSR scaffolds are based directly on Vite's SSR docs for setting up a server with SSR support.

All templates have their views written in JSX (or TSX, for the TS-templates), but you can just as easily install a view-system of your preference (or use hyperapp's builtin `h` and `text`). Just name your files with `.js` or `.ts` extensions instead of `.jsx`.

