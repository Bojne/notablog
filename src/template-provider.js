const path = require('path')
const fs = require('fs')

const DEBUG_EN = false

class TemplateProvider {

  /**
   * @param {string} themeDir 
   */
  constructor(themeDir) {
    this.templateDir = path.join(themeDir, 'layout')
    this.templateMap = {}
  }

  /**
   * Get template as a string with its name.
   * 
   * The name of a template is its filename without extension.
   * @param {string} templateName 
   */
  get(templateName) {
    if (DEBUG_EN) console.log(`Get template ${templateName}`)
    if (typeof templateName === 'string') {
      let template = this.templateMap[templateName]
      let templatePath = path.join(this.templateDir, `${templateName}.html`)
      if (template) return { string: template, filename: templatePath }
      else return { string: this._load(templateName), filename: templatePath }
    } else {
      return `${templateName} is not a string`
    }
  }

  /**
   * Load a template as a string into cache and return it.
   * 
   * If loading failed, return an error message string.
   * @param {string} templateName 
   */
  _load(templateName) {
    if (DEBUG_EN) console.log(`Load template ${templateName}`)
    let templatePath = path.join(this.templateDir, `${templateName}.html`)
    try {
      this.templateMap[templateName] =
        fs.readFileSync(templatePath, { encoding: 'utf-8' })
      return this.templateMap[templateName]
    } catch (err) {
      console.log(err)
      return `Cannot find ${templateName}.html in ${this.templateDir}`
    }
  }
}

module.exports = TemplateProvider