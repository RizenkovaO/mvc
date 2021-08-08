const UserRepository = require("../repositories/UserRepository");
const bcrypt = require("bcrypt");

class AuthenicationController {
    
  // used for rendering create student form
  renderLoginForm(req, res) {
      res.render("pages/login");
  }

  async login(req, res){
    const users = await UserRepository.getAll();
    let filterUser = users.filter((u) => {
      return req.body.name == u.name
    })
    if(!filterUser) res.render(`pages/error`)
    let user = filterUser[0]

    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if(!isMatch) {
      console.error('PASSWORD DON"t MATCH')
      res.render(`pages/error`)
    }
    res.redirect(`/`)
  }
  
  
  async create(req, res) {
    const user = await UserRepository.create(req.body);
    user ? res.redirect(`/`) : res.render(`pages/error`)
    
  }


  
  renderRegForm(req, res) {
    res.render("pages/registration");

  }
  
}

module.exports = new AuthenicationController();