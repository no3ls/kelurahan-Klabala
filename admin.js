const $=s=>document.querySelector(s),ld=(k,d)=>{try{const v=localStorage.getItem(k);return v?JSON.parse(v):d}catch(e){return d}},sv=(k,v)=>{try{localStorage.setItem(k,JSON.stringify(v));return true}catch(e){toast('Penyimpanan penuh. Kurangi ukuran foto/berkas.');return false}},esc=x=>String(x??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])),fd=d=>new Date(d).toLocaleDateString('id-ID',{day:'numeric',month:'long',year:'numeric'}),wa=p=>String(p).replace(/\D/g,'').replace(/^0/,'62');
const PW='admin123';/* GANTI. Ini hanya kata sandi contoh di sisi browser, bukan keamanan sungguhan */
document.documentElement.dataset.theme=ld('th','light');
const CK={berita:'adm_news',pengumuman:'adm_ann'},SS={subs:['Menunggu verifikasi','Diproses','Perbaiki laporan','Selesai'],rpts:['Menunggu validasi','Diproses','Selesai']},
TABS=[['ringkasan','Ringkasan'],['berita','Berita'],['pengumuman','Pengumuman'],['layanan','Layanan'],['pengaduan','Pengaduan'],['warga','Warga'],['riwayat-layanan','Riwayat Layanan',1],['riwayat-pengaduan','Riwayat Pengaduan',1]];
/* Pesan WhatsApp otomatis. Edit redaksi di sini. */
const MSG={
layanan:'Halo Sobat Klabala 👋😊, Terima kasih sudah menggunakan Layanan Digital di Website Kelurahan Klabala 🙏 berikut ini surat yang kamu minta sudah jadi. Semoga bermanfaat, hubungi kami jika ada keperluan lainnya 🙏',
aduan:'Halo Sobat Klabala 👋😊, terima kasih sudah melapor kepada kami. Laporan Anda sudah sampai kepada Pimpinan, kami akan menindaklanjuti Laporan Anda 🙏. Terima kasih sudah menggunakan Layanan Digital di Website Kelurahan Klabala. Semoga bermanfaat, hubungi kami jika ada keperluan lainnya 🙏'};
let q='',per='all',tt,cid=null,ED={img:'',l:[]};
const toast=m=>{const e=$('#ts');e.textContent=m;e.style.display='block';clearTimeout(tt);tt=setTimeout(()=>e.style.display='none',3000)},closeM=()=>{$('#md').classList.remove('on');if(cid){cid=null;go()}};
$('#md').onclick=e=>{if(e.target.id=='md')closeM()};
const srch=()=>`<input id="q" aria-label="Cari" placeholder="Cari..." value="${esc(q)}" oninput="q=this.value;go()">`;

/* ---------- live chat pengumuman ---------- */
const CHAT='<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.4A8 8 0 1 1 21 12z"/></svg>',ADRD='adm_rd',
unrA=id=>{const c=ld('cha'+id,[]),r=ld(ADRD,{})[id]||0;return c.slice(r).filter(m=>!m.a).length},
totA=()=>ld(CK.pengumuman,[]).reduce((a,n)=>a+(n.id?unrA(n.id):0),0),
ftm=ts=>ts?new Date(ts).toLocaleString('id-ID',{day:'numeric',month:'short',hour:'2-digit',minute:'2-digit'}):'';
function rdA(id,len){const r=ld(ADRD,{});if(r[id]!==len){r[id]=len;sv(ADRD,r)}}
function drawC(f){const b=$('#ach');if(!b||!cid)return;const c=ld('cha'+cid,[]),near=f||b.scrollHeight-b.scrollTop-b.clientHeight<90;
b.innerHTML=c.map(m=>`<div class="cm ${m.a?'me':''}"><b>${m.n}${m.a?'<span class="adb">Admin</span>':''}</b><span class="ct">${m.m}</span>${m.at?`<small>${ftm(m.at)}</small>`:''}</div>`).join('')||'<div class="msg">Belum ada pesan dari warga.</div>';
if(near)b.scrollTop=b.scrollHeight;rdA(cid,c.length)}
function chat(id){const n=ld(CK.pengumuman,[]).find(x=>x.id==id);if(!n)return;cid=id;
$('#mb').innerHTML=`<h2 style="margin-top:0">Live chat</h2><p><small>${esc(n.t)}</small></p><div class="chat" id="ach"></div><div class="row" style="margin-top:12px"><input id="am" placeholder="Tulis balasan sebagai Admin" aria-label="Balasan" onkeydown="if(event.key=='Enter')sendC()"><button class="btn" onclick="sendC()">Kirim</button></div><p style="margin:12px 0 0"><button class="btn o" onclick="closeM()">Tutup</button></p>`;$('#md').classList.add('on');drawC(1);setTimeout(()=>$('#am').focus(),50)}
function sendC(){const i=$('#am'),v=i.value.trim();if(!v||!cid)return;const k='cha'+cid,c=ld(k,[]);c.push({n:'Admin Kelurahan',m:esc(v),a:1,at:Date.now()});if(!sv(k,c))return;i.value='';drawC(1)}
/* ---------- foto & lampiran berita/pengumuman ---------- */
const crop=f=>new Promise((ok,no)=>{const r=new FileReader();r.onerror=()=>no(new Error('Gagal membaca foto'));r.onload=()=>{const im=new Image();im.onerror=()=>no(new Error('Foto tidak didukung (gunakan JPG/PNG)'));im.onload=()=>{const W=960,H=600,k=Math.max(W/im.width,H/im.height),w=im.width*k,h=im.height*k,c=document.createElement('canvas');c.width=W;c.height=H;const x=c.getContext('2d');x.fillStyle='#fff';x.fillRect(0,0,W,H);x.drawImage(im,(W-w)/2,(H-h)/2,w,h);ok(c.toDataURL('image/jpeg',.78))};im.src=r.result};r.readAsDataURL(f)});
function drawEd(){$('#fpv').innerHTML=ED.img?`<div class="ph im" style="max-width:320px"><img src="${esc(ED.img)}" alt="Pratinjau foto"></div>`:'';
$('#fls').innerHTML=ED.l.map((x,j)=>`<div class="up"><div><b>${esc(x.n)}</b><br><small>${x.k=='link'?esc(x.u):'File terunggah'}</small></div><button class="btn o dg" type="button" onclick="ED.l.splice(${j},1);drawEd()">Hapus</button></div>`).join('')}
async function pickImg(el){const f=el.files[0];if(!f)return;try{ED.img=await crop(f)}catch(e){toast(e.message)}el.value='';drawEd()}
function pickFile(el){const f=el.files[0];if(!f)return;if(f.size>1048576){el.value='';return toast('Ukuran file maksimal 1 MB')}const r=new FileReader();r.onload=()=>{ED.l.push({n:f.name,u:r.result,k:'file',t:f.type});el.value='';drawEd()};r.readAsDataURL(f)}
function addLink(){let n=$('#lnn').value.trim(),u=$('#lnu').value.trim();if(!u)return toast('Isi alamat tautan');if(!/^https?:\/\//i.test(u))u='https://'+u;let h;try{h=new URL(u).hostname}catch(e){return toast('Alamat tautan tidak valid')}ED.l.push({n:n||h,u,k:'link'});$('#lnn').value=$('#lnu').value='';drawEd()}
/* ---------- helper data ---------- */
/* No. WA: pengaduan = r.p. Layanan = r.hp/wa/h/phone/tel/nohp, atau dicari dari data warga (email/nama). */
const ph=(r,k)=>{if(k=='rpts')return r.p||'';const v=r.hp||r.wa||r.h||r.phone||r.tel||r.nohp;if(v)return v;const u=ld('users',[]).find(u=>(r.e&&u.email==r.e)||(r.em&&u.email==r.em)||(r.p&&u.name==r.p));return u?u.phone||'':''};
const wl=(p,m)=>`https://wa.me/${wa(p)}`+(m?`?text=${encodeURIComponent(m)}`:'');
const wlink=(p,m)=>p?`<a target="_blank" rel="noopener" href="${wl(p,m)}" title="Buka chat WhatsApp">${esc(p)}</a>`:'<small>-</small>';
/* Berkas: array r.f = [{n:nama,t:tipe,u:dataURL}] (nama alternatif juga dibaca) */
const fl=r=>{const a=r.f||r.files||r.berkas||r.file||r.lampiran||[];return(Array.isArray(a)?a:[a]).filter(Boolean).map((x,i)=>typeof x=='string'?{n:'Berkas '+(i+1),u:x,t:''}:{n:x.n||x.name||'Berkas '+(i+1),u:x.u||x.data||x.url||x.src||'',t:x.t||x.type||''}).filter(x=>x.u)};
const inP=d=>per=='all'||new Date(d)>=new Date(Date.now()-30*864e5);
/* sel: data terfilter [[rec,index]]. kind: subs | rpts | rl (riwayat layanan) | rp (riwayat pengaduan) | users */
function sel(kind){const m=x=>String(x??'').toLowerCase().includes(q.toLowerCase());
if(kind=='users')return ld('users',[]).map((u,i)=>[u,i]).filter(([u])=>m((u.name||'')+(u.email||'')+(u.phone||'')));
const h=kind=='rl'||kind=='rp',k=kind=='rl'?'subs':kind=='rp'?'rpts':kind,a=ld(k,[]).map((r,i)=>[r,i]).filter(([r])=>m((r.c||'')+(r.n||'')+(r.p||'')+(r.x||'')));
return h?a.filter(([r])=>r.s=='Selesai'&&inP(r.d)):a}

/* ---------- ekspor ---------- */
const L=r=>[r.c,r.n,r.p,ph(r,'subs'),fd(r.d),r.s,fl(r).length],P=r=>[r.c,r.n,r.p,r.x,fd(r.d),r.s,fl(r).length],HL=['Kode','Layanan','Pemohon','No. HP/WA','Tanggal','Status','Jumlah berkas'],HP=['Kode','Pelapor','No. HP/WA','Isi pengaduan','Tanggal','Status','Jumlah berkas'];
const EX={subs:{t:'Rekap Layanan',h:HL,f:L},rl:{t:'Riwayat Layanan',h:HL,f:L},rpts:{t:'Rekap Pengaduan',h:HP,f:P},rp:{t:'Riwayat Pengaduan',h:HP,f:P},users:{t:'Rekap Warga',h:['Nama','Email','No. HP','Tanggal daftar'],f:u=>[u.name,u.email,u.phone,fd(u.at)]}};
const dlb=k=>`<span class="dlg"><small>Unduh:</small><button class="btn o" onclick="ex('${k}','csv')">CSV</button><button class="btn o" onclick="ex('${k}','xlsx')">Excel</button><button class="btn o" onclick="ex('${k}','pdf')">PDF</button></span>`;
function saveBlob(b,n){const a=document.createElement('a');a.href=URL.createObjectURL(b);a.download=n;a.click()}
function ex(kind,fmt){const E=EX[kind],rows=sel(kind).map(([r])=>E.f(r).map(v=>v??''));if(!rows.length)return toast('Tidak ada data');
const fn=E.t.replace(/\s+/g,'_').toLowerCase()+'_'+new Date().toISOString().slice(0,10),
sub=kind=='rl'||kind=='rp'?(per=='all'?'Rekap keseluruhan':'Rekap 1 bulan terakhir'):'Dicetak '+fd(Date.now());
if(fmt=='csv'){const c=v=>'"'+String(v).replace(/"/g,'""')+'"';saveBlob(new Blob(['\ufeff'+[E.h,...rows].map(x=>x.map(c).join(',')).join('\n')],{type:'text/csv'}),fn+'.csv')}
else if(fmt=='xlsx'){if(!window.XLSX)return toast('Pustaka Excel belum termuat (perlu internet)');const wb=XLSX.utils.book_new();XLSX.utils.book_append_sheet(wb,XLSX.utils.aoa_to_sheet([E.h,...rows]),'Rekap');XLSX.writeFile(wb,fn+'.xlsx')}
else{if(!window.jspdf)return toast('Pustaka PDF belum termuat (perlu internet)');const d=new jspdf.jsPDF({orientation:'landscape'});d.setFontSize(14);d.text('Kelurahan Klabala - '+E.t,14,14);d.setFontSize(9);d.text(sub+' | Total: '+rows.length+' data',14,20);d.autoTable({head:[E.h],body:rows,startY:25,styles:{fontSize:8,cellPadding:2},headStyles:{fillColor:[14,165,233]}});d.save(fn+'.pdf')}}

/* ---------- berkas ---------- */
async function vf(k,i){const r=ld(k,[])[i],f=fl(r);
$('#mb').innerHTML=`<h2 style="margin-top:0">Berkas ${esc(r.c)}</h2><div id="fv"></div><p><button class="btn o" onclick="closeM()">Tutup</button></p>`;$('#md').classList.add('on');
for(const x of f){let u=x.u;try{if(u.startsWith('data:'))u=URL.createObjectURL(await(await fetch(u)).blob())}catch(e){}
const t=x.t||(x.u.match(/^data:([^;,]+)/)||[])[1]||'',img=t.startsWith('image/')||/\.(png|jpe?g|gif|webp)$/i.test(x.n),pdf=t=='application/pdf'||/\.pdf$/i.test(x.n);
$('#fv').insertAdjacentHTML('beforeend',`<div class="fi"><b>${esc(x.n)}</b>${img?`<img src="${esc(u)}" alt="${esc(x.n)}">`:pdf?`<iframe src="${esc(u)}" title="${esc(x.n)}"></iframe>`:''}<p class="ac"><a class="btn o" target="_blank" rel="noopener" href="${esc(u)}">Buka</a><a class="btn o" href="${esc(u)}" download="${esc(x.n)}">Unduh</a></p></div>`)}}

/* ---------- tampilan ---------- */
function dash(){const s=ld('subs',[]),r=ld('rpts',[]),u=ld('users',[]),ps=s.filter(x=>x.s==SS.subs[0]).length,pr=r.filter(x=>x.s==SS.rpts[0]).length;
const L=[...s.filter(x=>x.s==SS.subs[0]).map(x=>[x.u?'Layanan (diperbarui)':'Layanan',x.n,x.p,x.u||x.d]),...r.filter(x=>x.s==SS.rpts[0]).map(x=>['Pengaduan',(x.x||'').slice(0,70),x.n,x.d])].sort((a,b)=>b[3]<a[3]?-1:1).slice(0,6);
const k=(n,l,c='')=>`<div class="card ${c}"><b>${n}</b><span>${l}</span></div>`;
return`<div class="kpi">${k(ld(CK.berita,[]).length,'Berita')}${k(ld(CK.pengumuman,[]).length,'Pengumuman')}${k(s.length,'Total pengajuan layanan')}${k(r.length,'Total pengaduan')}${k(u.length,'Warga terdaftar')}${k(ps,'Pengajuan menunggu',ps?'w2':'')}${k(pr,'Pengaduan menunggu',pr?'w2':'')}${k(totA(),'Chat warga belum dibaca',totA()?'w2':'')}</div><h3>Perlu tindakan</h3><div class="card tb"><table>${L.map(x=>`<tr><td><span class="stt">${x[0]}</span></td><td>${esc(x[1])}<br><small>${esc(x[2])}</small></td><td>${fd(x[3])}</td></tr>`).join('')||'<tr><td>Tidak ada yang menunggu. Semua sudah ditangani.</td></tr>'}</table></div>`}
function cont(t){const f=ld(CK[t],[]).map((n,i)=>[n,i]).filter(([n])=>n.t.toLowerCase().includes(q.toLowerCase()));
return`<div class="bar">${srch()}<button class="btn" onclick="edit('${t}',-1)">+ Tambah</button></div><div class="card tb"><table><tr><th>Judul</th><th>${t=='berita'?'Tanggal':'Berlaku sampai'}</th><th></th></tr>${f.map(([n,i])=>{const u=t=='pengumuman'&&n.id?unrA(n.id):0;return`<tr><td>${n.img?`<img class="th" src="${esc(n.img)}" alt="">`:''}${esc(n.t)}${(n.l||[]).length?` <small>· ${n.l.length} lampiran</small>`:''}</td><td>${fd(n.d)}</td><td class="ac">${t=='pengumuman'&&n.id?`<button class="btn o chb" onclick="chat('${n.id}')" aria-label="Live chat" title="Live chat warga">${CHAT}${u?`<span class="nb">${u}</span>`:''}</button>`:''}<button class="btn o" onclick="edit('${t}',${i})">Edit</button><button class="btn o dg" onclick="rm('${CK[t]}',${i})">Hapus</button></td></tr>`}).join('')||'<tr><td colspan="3">Belum ada data. Klik Tambah, atau buka website sekali agar data contoh termuat.</td></tr>'}</table></div>`}
function edit(t,i){const n=i<0?{t:'',d:new Date(Date.now()-new Date().getTimezoneOffset()*6e4).toISOString().slice(0,10),x:''}:ld(CK[t],[])[i];ED={img:n.img||'',l:[...(n.l||[])]};
$('#mb').innerHTML=`<h2 style="margin-top:0">${i<0?'Tambah':'Ubah'} ${t}</h2><label for="ft">Judul</label><input id="ft" value="${esc(n.t)}"><label for="fdt">${t=='berita'?'Tanggal terbit':'Berlaku sampai'}</label><input id="fdt" type="date" value="${n.d}"><label for="fx">Isi</label><textarea id="fx" rows="6">${esc(n.x)}</textarea>
<label>Foto (otomatis dipotong rasio 16:10 agar pas dengan kartu)</label><div class="upz"><label class="btn s2" for="fimg">Pilih foto</label><input id="fimg" type="file" accept="image/*" hidden onchange="pickImg(this)"><button class="btn o" type="button" onclick="ED.img='';drawEd()">Hapus foto</button></div><div id="fpv"></div>
<label>Lampiran file / tautan (bisa diklik langsung terbuka)</label><div class="upz"><label class="btn s2" for="ffl">Unggah file</label><input id="ffl" type="file" hidden onchange="pickFile(this)"><small>PDF, Word, Excel, gambar. Maks 1 MB per file.</small></div><div class="row" style="margin-top:8px;flex-wrap:wrap"><input id="lnn" placeholder="Nama tombol (mis. Formulir)" style="min-width:150px"><input id="lnu" placeholder="https://alamat-tautan" style="min-width:180px"><button class="btn o" type="button" onclick="addLink()">Tambah tautan</button></div><div id="fls"></div>
<p class="err" id="fe"></p><p style="display:flex;gap:10px"><button class="btn" onclick="save('${t}',${i})">Simpan</button><button class="btn o" onclick="closeM()">Batal</button></p>`;$('#md').classList.add('on');drawEd();setTimeout(()=>$('#ft').focus(),50)}
function save(t,i){const n={t:$('#ft').value.trim(),d:$('#fdt').value,x:$('#fx').value.trim(),img:ED.img,l:ED.l};if(!n.t||!n.d||!n.x)return $('#fe').textContent='Judul, tanggal, dan isi wajib diisi.';
const a=ld(CK[t],[]);if(i<0){n.id=Date.now().toString(36)+Math.random().toString(36).slice(2,5);a.unshift(n)}else{n.id=a[i].id||Date.now().toString(36);a[i]=n}if(t=='berita')a.sort((x,y)=>y.d<x.d?-1:1);
if(!sv(CK[t],a))return $('#fe').textContent='Penyimpanan penuh. Perkecil foto/berkas.';/* memicu event "storage" di tab website agar beranda & halaman berita/pengumuman langsung ter-update */
closeM();go();toast('Tersimpan & langsung terbit')}
function rm(k,i){if(!confirm('Hapus data ini?'))return;const a=ld(k,[]);a.splice(i,1);sv(k,a);go();toast('Dihapus')}
/* Layanan, Pengaduan, dan Riwayat (kind: subs | rpts | rl | rp) */
function view(kind){const h=kind=='rl'||kind=='rp',k=kind=='rl'?'subs':kind=='rp'?'rpts':kind,s=k=='subs',f=sel(kind);
const per_=h?`<select aria-label="Periode" onchange="per=this.value;go()"><option value="all" ${per=='all'?'selected':''}>Rekap keseluruhan</option><option value="30" ${per=='30'?'selected':''}>Rekap 1 bulan terakhir</option></select>`:'';
return`<div class="bar">${srch()}${per_}${dlb(kind)}</div><div class="card tb"><table><tr><th>Kode</th><th>${s?'Layanan / pemohon':'Pelapor / isi aduan'}</th><th>No. WA</th><th>Berkas</th><th>Tanggal</th><th>Status</th>${h?'':'<th></th>'}</tr>${f.map(([r,i])=>{const n=fl(r).length;
return`<tr><td><b>${esc(r.c)}</b></td><td>${s?`${esc(r.n)}${r.u?` <span class="stt fix">Diperbarui warga · ${fd(r.u)}</span>`:''}<br><small>${esc(r.p)}${r.k?' · NIK '+esc(r.k):''}</small>`:`${esc(r.n)}<br><small>${esc(r.x)}</small>`}</td><td>${wlink(ph(r,k),s?MSG.layanan:'')}</td><td>${n?`<button class="btn o" onclick="vf('${k}',${i})">Lihat (${n})</button>`:'<small>-</small>'}</td><td>${fd(r.d)}</td><td>${h?`<span class="stt">${esc(r.s)}</span>`:`<select aria-label="Status" onchange="setS('${k}',${i},this.value)">${SS[k].map(o=>`<option ${o==r.s?'selected':''}>${o}</option>`).join('')}</select>`}</td>${h?'':`<td><button class="btn o dg" onclick="rm('${k}',${i})">Hapus</button></td>`}</tr>`}).join('')||`<tr><td colspan="7">${h?'Belum ada riwayat pada periode ini.':'Belum ada data.'}</td></tr>`}</table></div>`}
function setS(k,i,v){const a=ld(k,[]);a[i].s=v;if(k=='subs')delete a[i].u;sv(k,a);toast('Status diperbarui');
/* Pengaduan selesai -> buka WhatsApp pelapor dengan pesan otomatis */
if(k=='rpts'&&v==SS.rpts[2]){const p=ph(a[i],k);if(p)window.open(wl(p,MSG.aduan),'_blank');else toast('Status selesai, tetapi nomor WA pelapor kosong')}}
function users(){const f=sel('users');
return`<div class="bar">${srch()}${dlb('users')}</div><div class="card tb"><table><tr><th>Nama</th><th>Email</th><th>No. HP</th><th>Daftar</th><th></th></tr>${f.map(([u,i])=>`<tr><td>${esc(u.name)}</td><td>${esc(u.email)}</td><td>${wlink(u.phone,'')}</td><td>${fd(u.at)}</td><td><button class="btn o dg" onclick="rm('users',${i})">Hapus</button></td></tr>`).join('')||'<tr><td colspan="5">Belum ada warga terdaftar.</td></tr>'}</table></div>`}
function login(){if($('#pw').value==PW){sv('adm_in',1);go()}else $('#le').textContent='Kata sandi salah.'}
function out(){sv('adm_in',0);go()}
function go(){const h=location.hash.slice(2)||'ringkasan',R=$('#root');
if(!ld('adm_in',0)){R.innerHTML=`<div class="card lgn"><h1>Admin Kelurahan Klabala</h1><label for="pw">Kata sandi</label><input id="pw" type="password" onkeydown="if(event.key=='Enter')login()"><p class="err" id="le"></p><button class="btn" onclick="login()">Masuk</button></div>`;return}
const V={ringkasan:dash,berita:()=>cont('berita'),pengumuman:()=>cont('pengumuman'),layanan:()=>view('subs'),pengaduan:()=>view('rpts'),warga:users,'riwayat-layanan':()=>view('rl'),'riwayat-pengaduan':()=>view('rp')}[h]||dash,T=TABS.find(x=>x[0]==h)||TABS[0];
R.innerHTML=`<div class="ad"><aside><div class="lg">Admin<small>Kelurahan Klabala</small></div>${TABS.map((x,j)=>(x[2]&&!TABS[j-1][2]?'<div class="grp">Riwayat</div>':'')+`<a href="#/${x[0]}" class="${x==T?'on':''}">${x[1]}${x[0]=='pengumuman'&&totA()?`<span class="nb">${totA()}</span>`:''}</a>`).join('')}<button class="btn o" onclick="out()">Keluar</button></aside><main><h1>${T[1]}</h1>${V()}</main></div>`;
const e=$('#q');if(e&&q){e.focus();e.setSelectionRange(q.length,q.length)}}
/* Notifikasi lintas-tab: pesan chat baru, pengajuan baru/diperbarui warga */
addEventListener('storage',e=>{if(!ld('adm_in',0)||!e.key)return;
if(e.key.startsWith('cha')){const id=e.key.slice(3);if(cid==id){drawC();return}const c=ld(e.key,[]),l=c[c.length-1];if(l&&!l.a)toast('Pesan baru dari warga di Pengumuman');if(!$('#md').classList.contains('on'))go();return}
if(!['subs','rpts','users'].includes(e.key))return;
try{const o=JSON.parse(e.oldValue||'[]'),n=JSON.parse(e.newValue||'[]');if(e.key=='subs'&&n.some(r=>r.u&&(o.find(x=>x.c==r.c)||{}).u!=r.u))toast('Warga memperbarui pengajuan. Cek menu Layanan.');else if(e.key=='subs'&&n.length>o.length)toast('Ada pengajuan layanan baru');else if(e.key=='rpts'&&n.length>o.length)toast('Ada pengaduan baru')}catch(x){}
if(!$('#md').classList.contains('on'))go()});
addEventListener('hashchange',()=>{q='';go()});go();