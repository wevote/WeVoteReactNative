/* December 2017
In React-native, the following is ok, and will work
  let x = require('../../../img/global/photos/Jenifer_Fernandez_Ancona-200x200.jpg');
but, the following will not work
  let y = '../../../img/global/photos/Jenifer_Fernandez_Ancona-200x200.jpg';
  let x = require(y);
the reason is that the react-native packager, finds all of the static reference to images like in that
first example, and copies the image into a static image space in the bundled output js file.  You can't
locate images dynamically at run time (on purpose) since the directory path to the images does not survive
the bundling (facebook says something better is coming someday in this area).  When you try the second
example you get the (really dumb and off topic) warning "Unable to resolve module ./my-icon.png from ...index.android.js:
could not resolve `...my-icon.png' as a folder: it did not contain a package, nor an index file"
 */

const we_vote_board = [ {
    name: 'Jenifer Fernandez Ancona',
    image: require('../../../img/global/photos/Jenifer_Fernandez_Ancona-200x200.jpg'),
    title: [
      'Co-Founder & c4 Board Chair', 
      'VP, Strategy & Member Engagement at the Women Donors Network.'
    ]
  }, {
    name: 'Debra Cleaver',
    image: require('../../../img/global/photos/Debra_Cleaver-200x200.jpg'),
    title: [
      'c3 Board Member', 
      'Founder & CEO of VOTE.org, the web\'s most heavily trafficked site for accurate voting information.'
    ]
  }, {
    name: 'Tiana Epps-Johnson',
    image: require('../../../img/global/photos/Tiana_Epps_Johnson-200x200.jpg'),
    title: [
      'Senior Adviser', 
      'Exec. Dir. of CTCL, software for election administrators. Former Voting Info Project Harvard Ash Center for Democratic Governance and Innovation.'
    ]
  }, {
    name: 'Tory Gavito',
    image: require('../../../img/global/photos/Tory_Gavito-200x200.jpg'),
    title: [
      'c4 Board Member',
      'Exec. Dir. at Texas Future Project.'
    ]
  }, {
    name: 'Lawrence Grodeska',
    image: require('../../../img/global/photos/Lawrence_Grodeska-200x200.jpg'),
    title: [
      'c3 Board Chair',
      'Civic Tech communications and innovation at CivicMakers. Formerly at Change.org.'
    ]
  }, {
    name: 'Dale John McGrew',
    image: require('../../../img/global/photos/Dale_McGrew-200x200.jpg'),
    title: [
      'Co-Founder / CTO & c3 + c4 Board Member',
      'Managed large software projects for companies like Disney and over 60 nonprofits.'
    ]
  }, {
    name: 'Barbara Shannon',
    image: require('../../../img/global/photos/Barbara_Shannon-200x200.jpg'),
    title: [
      'Co-Founder / CTO & c3 + c4 Board Member',
      'Adviser to entrepreneurs and C-level Fortune 500 leaders. MBA The Wharton School.'
    ]
  }, {
    name: 'Anat Shenker-Osorio',
    image: require('../../../img/global/photos/Anat_Shenker_Osario-200x200.jpg'),
    title: [
      'c4 Board Member',
      'Communications expert, researcher and political pundit.'
    ]
  }, {
    name: 'Betsy Sikma',
    image: require('../../../img/global/photos/Betsy_Sikma-200x200.jpg'),
    title: [
      'c3 Board Member',
      ''
    ]
  }, {
    name: 'Billy Wimsatt',
    image: require('../../../img/global/photos/Billy_Wimsatt-200x200.jpg'),
    title: [
      'Senior Adviser',
      'Author and political activist. Founder of Gamechanger Labs, the League of Young Voters & TheBallot.org.'
    ]
  }, {
    name: 'William Winters',
    image: require('../../../img/global/photos/William_Winters-200x200.jpg'),
    title: [
      'c4 Board Member',
      'Campaign Manager. Courage Campaign, Color Of Change, CEL & Change.org.'
    ]
  }
];

const we_vote_staff = [ {
    name: 'Alicia Prevost',
    image: require('../../../img/global/photos/Alicia_Prevost-200x200.jpg'),
    title: [
      'Executive Director',
    ]
  }, {
    name: 'Dale John McGrew',
    image: require('../../../img/global/photos/Dale_McGrew-200x200.jpg'),
    title: [
      'Co-Founder / CTO'
    ]
  }, {
    name: 'Rohan Bhambhoria',
    image: require('../../../img/global/photos/Rohan_Bhambhoria-200x200.jpg'),
    title: [
      'Engineering Intern'
    ]
  }, {
    name: 'Yuanhsin Chang',
    image: require('../../../img/global/photos/Yuanhsin_Chang-200x200.jpg'),
    title: [
      'User Experience Design Intern'
    ]
  }, {
    name: 'Sarah Clements',
    image: require('../../../img/global/photos/Sarah_Clements-200x200.jpg'),
    title: [
      'Engineering Intern'
    ]
  }, {
    name: 'Mansi Desai',
    image: require('../../../img/global/photos/Mansi_Desai-200x200.jpg'),
    title: [
      'Digital Marketing Intern'
    ]
  }, {
    name: 'Neil Dullaghan',
    image: require('../../../img/global/photos/Neil_Dullaghan-200x200.jpg'),
    title: [
      'Political Data Manager'
    ]
  }, {
    name: 'Irene Florez',
    image: require('../../../img/global/photos/Irene_Florez-200x200.jpg'),
    title: [
      'Engineering Intern'
    ]
  }, {
    name: 'Jeff French',
    image: require('../../../img/global/photos/Jeff_French-200x200.jpg'),
    title: [
      'Lead Designer'
    ]
  }, {
    name: 'Anisha Jain',
    image: require('../../../img/global/photos/Anisha_Jain-200x200.jpg'),
    title: [
      'Sr. Software Engineer'
    ]
  }, {
    name: 'Judy Johnson',
    image: require('../../../img/global/photos/Judy_Johnson-200x200.jpg'),
    title: [
      'Operations'
    ]
  }, {
    name: 'Neelam Joshi',
    image: require('../../../img/global/photos/Neelam_Joshi-200x200.jpg'),
    title: [
      'Sr. Software Engineer'
    ]
  }, {
    name: 'Ciero Kilpatrick',
    image: require('../../../img/global/photos/Ciero_Kilpatrick-200x200.jpg'),
    title: [
      'User Experience Design Intern'
    ]
  }, {
    name: 'Edward Ly',
    image: require('../../../img/global/photos/Edward_Ly-200x200.jpg'),
    title: [
      'Engineering Intern'
    ]
  }, {
    name: 'Eric Ogawa',
    image: require('../../../img/global/photos/Eric_Ogawa-200x200.jpg'),
    title: [
      'User Experience Design Intern'
    ]
  }, {
    name: 'Steve Podell',
    image: require('../../../img/global/photos/Steve_Podell-200x200.jpg'),
    title: [
      'Volunteer'
    ]
  }, {
    name: 'Bharath Reddy',
    image: require('../../../img/global/photos/Bharath_Reddy-200x200.jpg'),
    title: [
      'Software Engineer'
    ]
  }
];

module.exports = {we_vote_board, we_vote_staff};
