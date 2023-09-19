const React = require('react')
class Show extends React.Component {
   render () {
    const fruit = this.props.fruit
    return (
      <div>
        <h1>Show Page</h1>
        The {fruit.name} is {fruit.color}
        {fruit.readyToEat? ` It is ready to eat` : ` It is not ready to eat... Can't touch this`}

        <h3>
                        <nav>
                        <a href="/fruits/">Back to Home</a>
                        </nav>
        </h3>

      </div>
      
     );
    }
 }
 module.exports  = Show;