import mustache from 'mustache'
import fs from 'fs'
import walk from 'fs-walk'
import path from 'path'
import camelcase from 'camelcase'
import mkdirp from 'mkdirp'


const newProject = ({outputDir, }) => {
  // set all the global options that we'll need in the templates
  const projectSlug = path.basename(outputDir)
  const projectBaseDir = path.resolve(path.dirname(outputDir))
  const newBaseDir = path.join(projectBaseDir, projectSlug)

  fs.access(newBaseDir, err => {
    if (!err && !process.env.OVERWRITE) {
      throw new Error('Path already exists: ' + newBaseDir)
    }

    const opts = {
      outputDir,
      projectBaseDir,
      projectSlug,
      projectName: camelcase(projectSlug),
      workDir: path.resolve('../'),
    }

    const visitor = (baseDir, fileName, stat, next) => {
      const filePath = path.resolve(baseDir, fileName)

      if (stat.isDirectory()) {
        return walk.walk(filePath, visitor, err => console.error(err))
      }
      fs.readFile(filePath, 'utf8', (err, template) => {
        if (!template) {
          return
        }
        const output = mustache.render(template, opts)
        const pathRelativeToTemplates = filePath.split('templates/')[1]
        const newPath = path.join(newBaseDir, pathRelativeToTemplates)
        const newPathDir = path.dirname(newPath)

        mkdirp(newPathDir, undefined, (err, made) => {
          if (err) {
            console.error('makdirp error', newPath, err)
          }
          fs.writeFile(newPath, output, err => {
            if (err) {
              console.error('writeFile error', newPath, err)
            }
          })
        })
      })
    }

    walk.walk('./templates', visitor, err => console.error(err))
  })
}


const getArgs = () => {

  return {
    outputDir: process.argv[2] || null
  }
}





newProject(getArgs())
// console.log('foo')
