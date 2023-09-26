// const React = require('react');

// class Index extends React.Component {
//   render() {
//       const { fruits } = this.props;
//       return (
//               <div>
//                   <h1>Fruits Index Page</h1>
//                   <ul>
//                       {fruits.map((fruit, i) => {
//                           return ( 
//                               <li>
//                                   The{' '}
//                                   <a href={`/fruits/${i}`}>
//                                       {fruit.name}
//                                   </a>{' '}
//                                   is {fruit.color} <br></br>
//                                   {fruit.readyToEat
//                                       ? `It is ready to eat`
//                                       : `It is not ready to eat`}
//                                   <br />
//                               </li>
                               
//                           );
//                       })}
//                   </ul>

//                         <nav>
//                         <a href="/fruits/new">Create a New Fruit</a>
//                         </nav>
//               </div>
//       );
//   }
// }
// module.exports = Index;

const React = require('react');
const DefaultLayout = require('../layouts/DefaultLayout');

class Index extends React.Component {
    render(){
      const fruits = this.props.fruits;
      return (
        <DefaultLayout title={"Fruits Index Page"}>
          <nav>
            <a href="/fruits/new">Create a New Fruit</a>
          </nav>
                <nav>
                <a href="/fruits/">Back to Home</a>
                </nav>
          <ul>
            {/* {
              fruits.map((fruit)=>{
                return (
                  <li key={fruit._id}>
                    The <a href={`/fruits/${fruit._id}`}>{fruit.name}</a>
                    {' '}is {fruit.color} <br/>
                    {
                      fruit.readyToEat?
                      '  It is ready to eat':
                      '  It is NASTY!!!!!!'
                    }
                  </li>
                )})} */}

{fruits.map((fruit,i) => {
                  return <li key={i}>
                      <a href={`/fruits/${fruit.id}`}>{fruit.name} </a>
                       { fruit.readyToEat? <span> It is ready to eat</span>: <span>  It is not ready to eat </span>}
                      {/* Your Delete Form Goes Here  It's incomplete we will fix below*/}
                     
                      <form action={`/fruits/${fruit._id}?_method=DELETE`} method="POST"><input type="submit" value="DELETE"/>
                      </form> 
                      <a href={`/fruits/${fruit._id}/edit`}>Edit This Fruit</a>
                  </li>
              })}
          </ul>
        </DefaultLayout>
        
      )  
    }
  }
  
  module.exports = Index;