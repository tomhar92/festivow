webpackJsonp([1],{"+Pz9":function(e,t){},"1iPH":function(e,t){},"7zck":function(e,t){},AAQu:function(e,t){},NHnr:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=a("7+uW"),s=a("/ocq"),n=a("vX5M"),o={name:"HelloWorld",data:function(){return{}},methods:{logout:function(){var e=this;n.auth.signOut().then(function(){e.$router.replace("login")})},administrator:function(){this.$router.replace("administrator")}}},i={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"hello"},[a("h1",[e._v("Hey Y'all!")]),e._v(" "),a("h2",[e._v("Welcome to Festivow!")]),e._v(" "),a("v-btn",{attrs:{color:"teal"},on:{click:e.logout}},[e._v("\n   Log Out\n ")]),e._v(" "),a("v-btn",{attrs:{color:"teal"},on:{click:e.administrator}},[e._v("\n    Administrator View\n  ")])],1)},staticRenderFns:[]};var u=a("VU/8")(o,i,!1,function(e){a("yDJ8")},null,null).exports,l=a("+cKO"),c=a("vX5M"),d={name:"login",data:function(){return{email:"",password:""}},validations:{email:{required:l.required,email:l.email},password:{required:l.required}},methods:{login:function(){c.auth.signInWithEmailAndPassword(this.email,this.password).then(function(e){N.replace("hello")},function(e){alert("Oops! "+e.message)})}},computed:{emailErrors:function(){var e=[];return this.$v.email.$dirty?(this.$v.email.required||e.push("Email is required. "),this.$v.email.email||e.push("Must be a valid email address"),e):e},passwordErrors:function(){var e=[];return this.$v.password.$dirty?(this.$v.password.required||e.push("Password is required. "),e):e}}},v={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"login"},[a("h1",[e._v("Sign In")]),e._v(" "),a("v-layout",{attrs:{"justify-center":""}},[a("v-form",[a("v-text-field",{attrs:{type:"email",label:"Email","error-messages":e.emailErrors},on:{touch:function(t){e.$v.email.$touch()},blur:function(t){e.$v.email.$touch()}},model:{value:e.email,callback:function(t){e.email=t},expression:"email"}}),e._v(" "),a("v-text-field",{attrs:{type:"password",label:"Password","error-messages":e.passwordErrors},on:{touch:function(t){e.$v.password.$touch()},blur:function(t){e.$v.password.$touch()}},model:{value:e.password,callback:function(t){e.password=t},expression:"password"}}),e._v(" "),a("v-btn",{attrs:{color:"teal"},on:{click:e.login}},[e._v("\n\t\t\t\tSign In\n\t\t\t")])],1)],1),e._v(" "),a("p",[e._v("You don't have an account yet? You can "),a("router-link",{attrs:{to:"/signup"}},[e._v("create one")])],1)],1)},staticRenderFns:[]};var m=a("VU/8")(d,v,!1,function(e){a("+Pz9")},"data-v-2178b4b6",null).exports,h=a("vX5M"),p={data:function(){return{email:"",password:"",confirmPassword:"",name:"",age:18,city:"",country:null,countries:["Afghanistan","Albania","Algeria","Andorra","Angola","Anguilla","Antigua &amp; Barbuda","Argentina","Armenia","Aruba","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia","Bosnia &amp; Herzegovina","Botswana","Brazil","British Virgin Islands","Brunei","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Canada","Cape Verde","Cayman Islands","Chad","Chile","China","Colombia","Congo","Cook Islands","Costa Rica","Cote D Ivoire","Croatia","Cruise Ship","Cuba","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea","Estonia","Ethiopia","Falkland Islands","Faroe Islands","Fiji","Finland","France","French Polynesia","French West Indies","Gabon","Gambia","Georgia","Germany","Ghana","Gibraltar","Greece","Greenland","Grenada","Guam","Guatemala","Guernsey","Guinea","Guinea Bissau","Guyana","Haiti","Honduras","Hong Kong","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Isle of Man","Israel","Italy","Jamaica","Japan","Jersey","Jordan","Kazakhstan","Kenya","Kuwait","Kyrgyz Republic","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macau","Macedonia","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Mauritania","Mauritius","Mexico","Moldova","Monaco","Mongolia","Montenegro","Montserrat","Morocco","Mozambique","Namibia","Nepal","Netherlands","Netherlands Antilles","New Caledonia","New Zealand","Nicaragua","Niger","Nigeria","Norway","Oman","Pakistan","Palestine","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Puerto Rico","Qatar","Reunion","Romania","Russia","Rwanda","Saint Pierre &amp; Miquelon","Samoa","San Marino","Satellite","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","South Africa","South Korea","Spain","Sri Lanka","St Kitts &amp; Nevis","St Lucia","St Vincent","St. Lucia","Sudan","Suriname","Swaziland","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Timor L'Este","Togo","Tonga","Trinidad &amp; Tobago","Tunisia","Turkey","Turkmenistan","Turks &amp; Caicos","Uganda","Ukraine","United Arab Emirates","United Kingdom","United States","United States Minor Outlying Islands","Uruguay","Uzbekistan","Venezuela","Vietnam","Virgin Islands (US)","Yemen","Zambia","Zimbabwe"]}},validations:{name:{required:l.required,minLength:Object(l.minLength)(4),onlyAlphaAndSpaces:function(e){return!!/^[a-zA-Z\s]+$/.test(e)}},password:{required:l.required,minLength:Object(l.minLength)(6),atLeastOneCapital:function(e){return!!/[A-Z]/.test(e)},atLeastOneLetter:function(e){return!!/[a-z]/.test(e)},atLeastOneNumber:function(e){return!!/[0-9]/.test(e)}},confirmPassword:{required:l.required,sameAs:Object(l.sameAs)("password")},email:{required:l.required,email:l.email},age:{required:l.required,between:Object(l.between)(12,120)}},computed:{nameErrors:function(){var e=[];return this.$v.name.$dirty?(this.$v.name.required||e.push("Name is required."),this.$v.name.minLength||e.push("Name must be at least 4 characters long"),this.$v.name.onlyAlphaAndSpaces||e.push("Only alphabeat characters or spaces."),e):e},passwordErrors:function(){var e=[];return this.$v.password.$dirty?(this.$v.password.required||e.push("Password is required. "),this.$v.password.minLength||e.push("Password must be at least 6 characters long"),this.$v.password.atLeastOneCapital||e.push("Must contain at least one capital letter"),this.$v.password.atLeastOneLetter||e.push("Must contain at least one small letter"),this.$v.password.atLeastOneNumber||e.push("Must contain at least one number"),e):e},confirmPasswordErrors:function(){var e=[];return this.$v.confirmPassword.$dirty?(this.$v.confirmPassword.required||e.push("Confirm password is required. "),this.$v.confirmPassword.sameAs||e.push("Password needs to be the same. "),e):e},emailErrors:function(){var e=[];return this.$v.email.$dirty?(this.$v.email.required||e.push("Email is required. "),this.$v.email.email||e.push("Must be a valid email address"),e):e},ageErrors:function(){var e=[];return this.$v.age.$dirty?(this.$v.age.required||e.push("Age is required. "),this.$v.age.between||e.push("Age must be between 12 and 120. "),e):e}},methods:{signUp:function(){if(this.$v.$touch(),!this.$v.$invalid){var e={email:this.email,name:this.name,age:this.age,city:this.city,country:this.country,admin:!1,reviews:[]};h.auth.createUserWithEmailAndPassword(this.email,this.password).then(function(t){var a=h.currentUser.uid;h.usersCollection.doc(a).set(e),alert("Your account has been created!"),N.push("hello")},function(e){alert("Oops! "+e.message)})}}}},f={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"sign-up"},[a("h1",{staticClass:"text"},[e._v("Sign Up")]),e._v(" "),a("h2",{staticClass:"text"},[e._v("Let's Create a New Account!")]),e._v(" "),a("v-layout",{attrs:{"justify-center":""}},[a("v-form",[a("v-text-field",{attrs:{label:"Name","error-messages":e.nameErrors,counter:"",hint:"At least 4 characters"},on:{touch:function(t){e.$v.name.$touch()},blur:function(t){e.$v.name.$touch()}},model:{value:e.name,callback:function(t){e.name=t},expression:"name"}}),e._v(" "),a("v-text-field",{attrs:{type:"password",label:"Password",hint:"At least 6 characters","error-messages":e.passwordErrors,counter:""},on:{touch:function(t){e.$v.password.$touch()},blur:function(t){e.$v.password.$touch()}},model:{value:e.password,callback:function(t){e.password=t},expression:"password"}}),e._v(" "),a("v-text-field",{attrs:{type:"password",label:"Confirm Password","error-messages":e.confirmPasswordErrors,counter:""},on:{touch:function(t){e.$v.confirmPassword.$touch()},blur:function(t){e.$v.confirmPassword.$touch()}},model:{value:e.confirmPassword,callback:function(t){e.confirmPassword=t},expression:"confirmPassword"}}),e._v(" "),a("v-text-field",{attrs:{label:"E-Mail","error-messages":e.emailErrors},on:{touch:function(t){e.$v.email.$touch()},blur:function(t){e.$v.email.$touch()}},model:{value:e.email,callback:function(t){e.email=t},expression:"email"}}),e._v(" "),a("v-text-field",{attrs:{type:"Number",label:"Age","error-messages":e.ageErrors},on:{touch:function(t){e.$v.age.$touch()},blur:function(t){e.$v.age.$touch()}},model:{value:e.age,callback:function(t){e.age=t},expression:"age"}}),e._v(" "),a("v-text-field",{attrs:{label:"City"},model:{value:e.city,callback:function(t){e.city=t},expression:"city"}}),e._v(" "),a("v-combobox",{attrs:{label:"Country",items:e.countries},model:{value:e.country,callback:function(t){e.country=t},expression:"country"}}),e._v(" "),a("v-btn",{attrs:{color:"teal"},on:{click:e.signUp}},[e._v("Sign Up")])],1)],1),e._v(" "),a("h3",{staticClass:"text"},[a("router-link",{attrs:{to:"/login"}},[e._v("Go back to login")])],1)],1)},staticRenderFns:[]};var g=a("VU/8")(p,f,!1,function(e){a("1iPH")},"data-v-5df92538",null).exports,w=a("vX5M"),b={name:"Administrator",data:function(){return{users:[]}},methods:{presentUsers:function(){console.log("Trying to Show Users!");var e=[];w.usersCollection.get().then(function(t){t.forEach(function(t){var a={id:t.id,name:t.data().name,email:t.data().email,country:t.data().country,city:t.data().city,age:t.data().age};e.push(a),console.log("Added User "+t.id+" To Users")})}),this.users=e},deleteUser:function(e){console.log("Trying to delete "+e),w.usersCollection.doc(e).delete().then(function(){alert("Deleted Document Successfully")}).catch(function(e){alert(e)})}}},_={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"Administrator"},[a("h1",[e._v("Administrator Panel")]),e._v(" "),a("v-btn",{attrs:{color:"teal"},on:{click:e.presentUsers}},[e._v("\n        Present Users\n      ")]),e._v(" "),e._l(e.users,function(t,r){return a("article",{key:r},[a("h2",[e._v("User Name: "+e._s(t.name))]),e._v(" "),a("h3",[e._v("User Email: "+e._s(t.email))]),e._v(" "),a("v-btn",{attrs:{color:"teal"},on:{click:function(a){e.deleteUser(t.id)}}},[e._v("\n          Delete User\n        ")])],1)}),e._v(" "),a("br")],2)},staticRenderFns:[]};var y=a("VU/8")(b,_,!1,function(e){a("iU6E")},"data-v-0d76cd2c",null).exports,$=a("vX5M"),P={data:function(){return{password:"",confirmPassword:"",openPassword:!0}},validations:{password:{required:l.required,minLength:Object(l.minLength)(6),atLeastOneCapital:function(e){return!!/[A-Z]/.test(e)},atLeastOneLetter:function(e){return!!/[a-z]/.test(e)},atLeastOneNumber:function(e){return!!/[0-9]/.test(e)}},confirmPassword:{required:l.required,sameAs:Object(l.sameAs)("password")}},computed:{passwordErrors:function(){var e=[];return this.$v.password.$dirty?(this.$v.password.required||e.push("Password is required. "),this.$v.password.minLength||e.push("Password must be at least 6 characters long"),this.$v.password.atLeastOneCapital||e.push("Must contain at least one capital letter"),this.$v.password.atLeastOneLetter||e.push("Must contain at least one small letter"),this.$v.password.atLeastOneNumber||e.push("Must contain at least one number"),e):e},confirmPasswordErrors:function(){var e=[];return this.$v.confirmPassword.$dirty?(this.$v.confirmPassword.required||e.push("Confirm password is required. "),this.$v.confirmPassword.sameAs||e.push("Password needs to be the same. "),e):e}},methods:{changePassword:function(){if(this.$v.$touch(),console.log("Checking if password form is valid"),!this.$v.$invalid){var e=$.auth.currentUser,t=this.password;console.log("Trying to update password"),e.updatePassword(t).then(function(){alert("password updated successfully!")}).catch(function(e){console.error(e)})}this.openPassword=!1}}},x={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("v-dialog",{attrs:{persistent:"","max-width":"500px"},model:{value:e.openPassword,callback:function(t){e.openPassword=t},expression:"openPassword"}},[a("v-card",[a("v-card-title",[a("h4",[e._v("Change Password")])]),e._v(" "),a("v-card-text",[a("v-text-field",{attrs:{type:"password",label:"New Password",hint:"At least 6 characters","error-messages":e.passwordErrors,counter:""},on:{touch:function(t){e.$v.password.$touch()},blur:function(t){e.$v.password.$touch()}},model:{value:e.password,callback:function(t){e.password=t},expression:"password"}}),e._v(" "),a("v-text-field",{attrs:{type:"password",label:"Confirm Password","error-messages":e.confirmPasswordErrors,counter:""},on:{touch:function(t){e.$v.confirmPassword.$touch()},blur:function(t){e.$v.confirmPassword.$touch()}},model:{value:e.confirmPassword,callback:function(t){e.confirmPassword=t},expression:"confirmPassword"}}),e._v(" "),a("v-btn",{attrs:{color:"primary"},on:{click:e.changePassword}},[e._v("Submit New Password\n          \t\t")]),e._v(" "),a("v-btn",{attrs:{color:"primary"},on:{click:function(t){e.openPassword=!1}}},[e._v("\n            \t\tClose\n          \t\t")])],1)],1)],1)},staticRenderFns:[]};var A=a("VU/8")(P,x,!1,function(e){a("AAQu")},"data-v-32f73c98",null).exports,C=a("vX5M"),U={name:"Administrator",data:function(){return{exists:!1,user:{}}},created:function(){var e=this;console.log("Trying to present user");var t=C.currentUser.uid;console.log("Looking for User : "+t),C.usersCollection.doc(t).get().then(function(a){a.exists?(console.log(a.data()),e.exists=!0,e.user.id=a.id,e.user.name=a.data().name,e.user.email=a.data().email,e.user.country=a.data().country,e.user.city=a.data().city,e.user.age=a.data().age,e.user.reviews=a.data().reviews):console.error("Doc "+t+" dont exist!")}).catch(function(e){console.error(e)})},methods:{openPasswordDialog:function(){var e=new(r.default.extend(A));e.$mount(),this.$refs.container.appendChild(e.$el)}}},E={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{ref:"container",staticClass:"profile"},[a("h1",[e._v("User Profile")]),e._v(" "),a("br"),e._v(" "),a("v-layout",{attrs:{"justify-center":""}},[a("v-responsive",{attrs:{"max-width":"500px"}},[e.exists?a("div",{staticClass:"details"},[a("v-layout",{attrs:{row:""}},[a("v-flex",{attrs:{xs6:""}},[a("h2",[e._v("User Name")])]),e._v(" "),a("v-flex",{attrs:{xs6:""}},[a("h2",[e._v(e._s(e.user.name))])])],1),e._v(" "),a("v-layout",{attrs:{row:""}},[a("v-flex",{attrs:{xs6:""}},[a("h4",[e._v("E-Mail")])]),e._v(" "),a("v-flex",{attrs:{xs6:""}},[a("h4",[e._v(e._s(e.user.email))])])],1),e._v(" "),a("v-layout",{attrs:{row:""}},[a("v-flex",{attrs:{xs6:""}},[a("h4",[e._v("Age")])]),e._v(" "),a("v-flex",{attrs:{xs6:""}},[a("h4",[e._v(e._s(e.user.age))])])],1),e._v(" "),a("v-layout",{attrs:{row:""}},[a("v-flex",{attrs:{xs6:""}},[a("h4",[e._v("City")])]),e._v(" "),a("v-flex",{attrs:{xs6:""}},[a("h4",[e._v(e._s(e.user.city))])])],1),e._v(" "),a("v-layout",{attrs:{row:""}},[a("v-flex",{attrs:{xs6:""}},[a("h4",[e._v("Country")])]),e._v(" "),a("v-flex",{attrs:{xs6:""}},[a("h4",[e._v(e._s(e.user.country))])])],1),e._v(" "),a("br"),e._v(" "),a("v-layout",{attrs:{row:""}},[a("v-btn",{attrs:{color:"primary"},on:{click:e.openPasswordDialog}},[e._v("Change Password")]),e._v(" "),a("v-btn",{attrs:{color:"primary"}},[e._v("Delete User")]),e._v(" "),a("v-btn",{attrs:{color:"primary"}},[e._v("Update Profile")])],1)],1):e._e()])],1)],1)},staticRenderFns:[]};var L=a("VU/8")(U,E,!1,function(e){a("u4QQ")},"data-v-0dcf6aba",null).exports,k=a("3EgV"),S=a.n(k),M=(a("7zck"),a("gJtD"),a("ESwS")),q=a.n(M),I=a("vX5M");r.default.use(s.a),r.default.use(S.a,{theme:{primary:"#4C4B63",secondary:"#AA7BC3",accent:"#475D9B"}}),r.default.use(q.a);var N=new s.a({routes:[{path:"*",redirect:"/login"},{path:"/hello",name:"HelloWorld",component:u,beforeEnter:function(e,t,a){I.currentUser?a():(alert("Please Login First"),a("login"))}},{path:"/profile",name:"User Profile",component:L,beforeEnter:function(e,t,a){I.currentUser?a():(alert("Please Login First"),a("login"))}},{path:"/login",name:"Login",component:m,beforeEnter:function(e,t,a){I.currentUser?(alert("You Are Already Logged In!"),a("hello")):a()}},{path:"/signup",name:"SignUp",component:g,beforeEnter:function(e,t,a){I.currentUser?(alert("You Are Already Logged In!"),a("hello")):a()}},{path:"/administrator",name:"Administrator",component:y,beforeEnter:function(e,t,a){I.currentUser?I.usersCollection.doc(I.currentUser.uid).get().then(function(e){e.exists?e.data().admin?a():a("hello"):(console.error("Doc doesnt exist"),a("hello"))}).catch(function(e){console.error(e)}):(alert("Youre Not Logged In"),a("login"))}}]}),O=a("vX5M"),B={name:"App",computed:{logged:function(){return!!O.currentUser}},methods:{hello:function(){N.push("hello")},profile:function(){N.push("profile")},login:function(){N.push("login")}}},z={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("v-app",{attrs:{id:"app"}},[a("v-toolbar",{attrs:{color:"cyan"}},[a("v-toolbar-title",[e._v("Festivow")]),e._v(" "),a("v-spacer"),e._v(" "),e.logged?a("v-toolbar-items",[a("v-btn",{attrs:{flat:""},on:{click:e.hello}},[e._v("Home Page")]),e._v(" "),a("v-btn",{attrs:{flat:""},on:{click:e.profile}},[e._v("Profile")])],1):a("v-toolbar-items",[a("v-btn",{attrs:{flat:""},on:{click:e.login}},[e._v("Login")])],1)],1),e._v(" "),a("router-view")],1)},staticRenderFns:[]};var G=a("VU/8")(B,z,!1,function(e){a("X8sG")},null,null).exports,D=a("vX5M");r.default.config.productionTip=!1;var T=void 0;D.auth.onAuthStateChanged(function(e){T||(T=new r.default({el:"#app",router:N,components:{App:G},template:"<App/>"}))})},X8sG:function(e,t){},gJtD:function(e,t){},iU6E:function(e,t){},u4QQ:function(e,t){},vX5M:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),a.d(t,"firestore",function(){return s}),a.d(t,"auth",function(){return n}),a.d(t,"currentUser",function(){return o}),a.d(t,"usersCollection",function(){return i});var r=a("kxiW");a.n(r),a("881v");r.initializeApp({apiKey:"AIzaSyDieHS7yhRgV6jR63iuVjvVT4cgCQGS22w",authDomain:"festivow.firebaseapp.com",databaseURL:"https://festivow.firebaseio.com",projectId:"festivow",storageBucket:"festivow.appspot.com",messagingSenderId:"783869676063"});var s=r.firestore(),n=r.auth(),o=r.currentUser;s.settings({timestampsInSnapshots:!0});var i=s.collection("users")},yDJ8:function(e,t){}},["NHnr"]);
//# sourceMappingURL=app.dd7fd2ca537f6d99f469.js.map