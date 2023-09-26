const React = require('react')
const DefaultLayout = require('../layouts/DefaultLayout.jsx')

class Show extends React.Component {
   render () {
    const vegetable = this.props.vegetable
    return (
      <div>
        {/* <h1>Show Page</h1> */}
        <DefaultLayout title = {"Vegetables Show Page"}>
        The {vegetable.name} is {vegetable.color}
        {vegetable.readyToEat? ` It is ready to eat` : ` It is not ready to eat... Can't touch this`}


        <h3>
                        <nav>
                        <a href="/vegetables/">Back to Home</a>
                        </nav>
        </h3>
        </DefaultLayout>

      </div>
      
     );
    }
 }
 module.exports  = Show;