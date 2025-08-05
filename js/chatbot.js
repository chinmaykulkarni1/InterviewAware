(function(root, factory){
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.ChatBot = factory();
  }
}(this, function(){
  const OWNER = 'OWNER'; // replace with repository owner
  const REPO = 'InterviewAware';
  const WORKFLOW_FILE = 'question.yml';

  function ghHeaders(token){
    const h = {
      'Accept': 'application/vnd.github+json',
      'Content-Type': 'application/json'
    };
    if(token) h['Authorization'] = 'Bearer ' + token;
    return h;
  }

  async function fetchQuestion(){
    const prompt = 'Generate one hardware engineering multiple choice question with four options and provide the correct answer index and explanation in JSON.';
    const token = typeof GITHUB_TOKEN !== 'undefined' ? GITHUB_TOKEN : '';
    const dispatchUrl = `https://api.github.com/repos/${OWNER}/${REPO}/actions/workflows/${WORKFLOW_FILE}/dispatches`;
    const res = await fetch(dispatchUrl, {method:'POST', headers: ghHeaders(token), body: JSON.stringify({ref:'main', inputs:{prompt}})});
    if(!res.ok) throw new Error('Workflow dispatch failed');
    return waitForArtifact(token);
  }

  async function waitForArtifact(token){
    const runsUrl = `https://api.github.com/repos/${OWNER}/${REPO}/actions/runs?event=workflow_dispatch&per_page=1`;
    for(let i=0;i<10;i++){
      const runRes = await fetch(runsUrl,{headers: ghHeaders(token)});
      const data = await runRes.json();
      const run = data.workflow_runs && data.workflow_runs[0];
      if(run && run.status === 'completed'){
        const artRes = await fetch(run.artifacts_url,{headers: ghHeaders(token)});
        const arts = await artRes.json();
        if(arts.artifacts && arts.artifacts.length){
          const url = arts.artifacts[0].archive_download_url;
          const zipRes = await fetch(url,{headers: ghHeaders(token)});
          const blob = await zipRes.blob();
          const zip = await JSZip.loadAsync(blob);
          const fileName = Object.keys(zip.files)[0];
          const content = await zip.file(fileName).async('string');
          return parseQuestion(content);
        }
      }
      await new Promise(r=>setTimeout(r,2000));
    }
    throw new Error('Artifact not available');
  }

  function parseQuestion(text){
    const data = typeof text === 'string' ? JSON.parse(text) : text;
    if(!Array.isArray(data.choices) || data.choices.length!==4) throw new Error('Invalid choices');
    if(typeof data.answer !== 'number') throw new Error('Answer index missing');
    return {question:data.question, choices:data.choices, answer:data.answer, explanation:data.explanation};
  }

  return { fetchQuestion, parseQuestion };
}));
