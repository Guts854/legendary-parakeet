const test = ()=>{
  const div = document.getElementById("test");
  if(div === null) return;
  div.innerHTML = "test";
}

test();