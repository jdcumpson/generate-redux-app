# {{projectName}}
---

To start your project the following steps will help

Install the dependencies
```bash
yarn install
```

Pick your http server, nginx for example
```bash
brew install nginx
```

and then install your nginx template
```
location /{{projectSlug}}.html {
    alias {{projectBaseDir}}/{{projectSlug}}/index.html;
}

location /{{projectSlug}}-ui/dist {
    alias {{projectBaseDir}}/{{projectSlug}}/dist;
    autoindex on;
}
```

Start your nginx (`sudo` if you're running on port 80 or 443)
```
nginx
```

Visit [http://localhost/{{projectSlug}}](http://localhost/{{projectSlug}})
