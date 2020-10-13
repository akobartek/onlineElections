(this["webpackJsonponline-elections"]=this["webpackJsonponline-elections"]||[]).push([[0],{78:function(e,t,a){e.exports=a(92)},91:function(e,t,a){},92:function(e,t,a){"use strict";a.r(t);var n=a(0),o=a.n(n),r=a(9),c=a.n(r),i=a(27),l=a(10),s=a(37),d=a(123),u=a(120),m=Object(u.a)((function(e){return{topSpacing:{paddingTop:e.spacing(1)},footer:{height:"12vh",backgroundColor:e.palette.background.paper,padding:e.spacing(3)}}}));function h(){return o.a.createElement(s.a,{variant:"body2",color:"textPrimary",align:"center"},"Wykonano dla ",o.a.createElement(d.a,{color:"inherit",target:"_blank",href:"https://mftau.pl/"},"wsp\xf3lnoty MF Tau"),".")}function p(){return o.a.createElement(s.a,{variant:"body2",color:"textSecondary",align:"center"},"Copyright \xa9 ",o.a.createElement(d.a,{color:"inherit",target:"_blank",href:"https://www.linkedin.com/in/bart%C5%82omiej-soko%C5%82owski-070943106/"},"Bart\u0142omiej Soko\u0142owski")," ",(new Date).getFullYear(),".")}function f(){var e=m();return o.a.createElement("footer",{className:e.footer},o.a.createElement("div",null,o.a.createElement(h,null)),o.a.createElement("div",{className:e.topSpacing},o.a.createElement(p,null)))}var g=a(54),v=a(135),b=a(134),E=a(125),y=a(30),k=a.n(y),w=(a(86),k.a.initializeApp({apiKey:"AIzaSyDw2RLBRjHdgpjtK4QsNFSpJyRDNKId7qc",authDomain:"onlineelections-641a1.firebaseapp.com",databaseURL:"https://onlineelections-641a1.firebaseio.com",projectId:"onlineelections-641a1",storageBucket:"onlineelections-641a1.appspot.com",messagingSenderId:"588573699709",appId:"1:588573699709:web:4fa3d587ae587e903f0b14",measurementId:"G-6JRK7DZ5NY"}).firestore());k.a;function C(){var e=Object(n.useState)(0),t=Object(g.a)(e,2),a=t[0],r=t[1],c=Object(n.useState)(0),l=Object(g.a)(c,2),s=l[0],d=l[1];return o.a.createElement("div",null,o.a.createElement("h1",null,"Wpisz kod wybor\xf3w, w kt\xf3rych chcesz wzi\u0105\u0107 udzia\u0142:"),o.a.createElement(v.a,{textAlign:"center"},o.a.createElement(b.a,{label:"Kod wybor\xf3w",onChange:function(e){r(e.target.value)}}),o.a.createElement("br",null),o.a.createElement("br",null),o.a.createElement("br",null),o.a.createElement(E.a,{variant:"contained",color:"primary",onClick:function(e){e.preventDefault(),w.collection("elections").doc(a).get().then((function(e){e.exists?s.click():alert("Brak wybor\xf3w o kodzie ".concat(a))}))}},"Zatwierd\u017a")),o.a.createElement(i.b,{to:"/elections/".concat(a),ref:function(e){return d(e)}}))}var j=a(45),R=a(46),x=a(25),O=a(48),D=a(47),F=a(126),S=a(127),z=a(128),N=function(e){Object(O.a)(a,e);var t=Object(D.a)(a);function a(e){var n;return Object(j.a)(this,a),(n=t.call(this,e)).state={dbData:null,currentRound:null,selectedCandidate:null,userCode:""},n.linkElement=o.a.createRef(),n.fetchDataFromFirestore=n.fetchDataFromFirestore.bind(Object(x.a)(n)),n.selectCandidate=n.selectCandidate.bind(Object(x.a)(n)),n.handleCodeChange=n.handleCodeChange.bind(Object(x.a)(n)),n.confirmSelection=n.confirmSelection.bind(Object(x.a)(n)),n}return Object(R.a)(a,[{key:"fetchDataFromFirestore",value:function(){var e=this,t=w.collection("elections").doc(this.props.match.params.code);t.get().then((function(a){var n=a.data();t.collection("rounds").doc(n.activeRound).get().then((function(t){e.setState({dbData:n,currentRound:t.data()})}))}))}},{key:"selectCandidate",value:function(e,t){""===t?this.setState({selectedCandidate:e}):this.setState({selectedCandidate:null})}},{key:"handleCodeChange",value:function(e){this.setState({userCode:e.target.value})}},{key:"confirmSelection",value:function(){var e=this,t=this.state.userCode;if(null!=this.state.selectedCandidate)if(""!==t){var a=w.collection("elections").doc(this.props.match.params.code);a.get().then((function(n){var o=n.data();if(o.voters.includes(t)){var r=a.collection("rounds").doc(o.activeRound);r.get().then((function(a){a.data().votes.includes(t)?alert("Oddano ju\u017c g\u0142os u\u017cywaj\u0105c podanego kodu!"):(r.update({voters:k.a.firestore.FieldValue.arrayUnion(t),votes:k.a.firestore.FieldValue.arrayUnion(e.state.currentRound.candidates[e.state.selectedCandidate])}),alert("G\u0142os pomy\u015blnie zapisany!"),e.linkElement.current.click())}))}else alert("Nie znaleziono podanego kodu na li\u015bcie kod\xf3w umo\u017cliwiaj\u0105cych g\u0142osowanie!")}))}else alert("Nie mo\u017cna zatwierdzi\u0107 g\u0142osu bez podania swojego kodu!");else alert("Nie mo\u017cna zatwierdzi\u0107 g\u0142osu bez wybrania kandydata!")}},{key:"componentDidMount",value:function(){this.fetchDataFromFirestore()}},{key:"render",value:function(){var e=this,t={height:"100%",display:"flex",flexDirection:"column",textAlign:"center"},a={flexGrows:1,height:"100%"},n="",r="",c=[];if(null!=this.state.currentRound){n=this.state.currentRound.name,r="w MF Tau ".concat(this.state.dbData.city);for(var l=function(n){var r="";null!=e.state.selectedCandidate&&e.state.selectedCandidate===n&&(r="primary.main"),c.push(o.a.createElement(F.a,{item:!0,key:n,xs:6,sm:4,md:2,onClick:function(){return e.selectCandidate(n,r)}},o.a.createElement(S.a,{style:t},o.a.createElement(v.a,{bgcolor:r,style:a},o.a.createElement(z.a,null,o.a.createElement(s.a,{align:"center",gutterBottom:!0,variant:"h6",component:"h2"},e.state.currentRound.candidates[n]))))))},d=0;d<this.state.currentRound.candidates.length;d++)l(d)}return o.a.createElement("div",null,o.a.createElement("h1",null,n,o.a.createElement("br",null),r),o.a.createElement(F.a,{container:!0,spacing:3,style:{marginTop:"30px",paddingLeft:"20px",paddingRight:"20px"}},c),o.a.createElement(v.a,{textAlign:"center",marginTop:"20px"},o.a.createElement(b.a,{label:"Kod g\u0142osowania",onChange:this.handleCodeChange})),o.a.createElement("div",{style:{minWidth:"30vh",display:"flex",justifyContent:"center",marginTop:"30px"}},o.a.createElement(E.a,{variant:"contained",onClick:this.fetchDataFromFirestore},"Od\u015bwie\u017c"),o.a.createElement(v.a,{width:"100px"}),o.a.createElement(E.a,{variant:"contained",color:"primary",onClick:this.confirmSelection},"Zag\u0142osuj")),o.a.createElement(i.b,{to:"/results/".concat(this.props.match.params.code),ref:this.linkElement}))}}]),a}(n.Component),I=a(129),B=a(130),W=a(131),T=a(124),K=function(e){Object(O.a)(a,e);var t=Object(D.a)(a);function a(e){var n;return Object(j.a)(this,a),(n=t.call(this,e)).state={dbData:null,currentRound:null},n}return Object(R.a)(a,[{key:"fetchDataFromFirestore",value:function(){var e=this,t=w.collection("elections").doc(this.props.match.params.code);t.get().then((function(a){var n=a.data();t.collection("rounds").doc(n.activeRound).get().then((function(a){for(var o=0;o<9;o++)t.collection("rounds").add(a.data());e.setState({dbData:n,currentRound:a.data()})}))}))}},{key:"componentDidMount",value:function(){this.fetchDataFromFirestore()}},{key:"render",value:function(){var e=this,t="",a=[];if(null!=this.state.currentRound){t=this.state.currentRound.name;for(var n=this.state.currentRound.votes.length,r=function(t){var r=e.state.currentRound.candidates[t],c=e.state.currentRound.votes.filter((function(e){return e===r})).length,i=c/n*100;i=Math.round(100*(i+Number.EPSILON))/100,a.push(o.a.createElement(I.a,null,o.a.createElement(B.a,{primary:r}),o.a.createElement(W.a,null,"".concat(c," (").concat(i,"%)"))))},c=0;c<this.state.currentRound.candidates.length;c++)r(c)}return o.a.createElement("div",null,o.a.createElement("h1",null,"Wyniki wybor\xf3w w g\u0142osowaniu ",o.a.createElement("br",null),'"'.concat(t,'"')),o.a.createElement(T.a,{dense:!0},a),o.a.createElement("div",{style:{minWidth:"30vh",display:"flex",justifyContent:"center",marginTop:"30px"}},o.a.createElement(E.a,{variant:"contained",onClick:function(){return e.props.history.goBack()}},"Wstecz"),o.a.createElement(v.a,{width:"100px"}),o.a.createElement(E.a,{variant:"contained",color:"primary",onClick:this.fetchDataFromFirestore},"Od\u015bwie\u017c")))}}]),a}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var M=a(133),A=a(65),J=a(132),L=(a(91),Object(A.a)({palette:{type:"dark"}})),V=Object(u.a)((function(e){return{mainView:{minHeight:"88vh",display:"flex",alignItems:"center",padding:"20px",justifyContent:"center"}}}));function G(){var e=V();return o.a.createElement(o.a.StrictMode,null,o.a.createElement(J.a,{theme:L},o.a.createElement(M.a,null),o.a.createElement("div",{className:e.mainView},o.a.createElement(i.a,{basename:"/onlineElections"},o.a.createElement(l.a,{path:"/",exact:!0,component:C}),o.a.createElement(l.a,{path:"/elections/:code",component:N}),o.a.createElement(l.a,{path:"/results/:code",component:K}))),o.a.createElement(f,null)))}c.a.render(o.a.createElement(G,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[78,1,2]]]);
//# sourceMappingURL=main.a27852da.chunk.js.map