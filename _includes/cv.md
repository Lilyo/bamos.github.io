I am a research scientist at <b>Facebook AI (FAIR)</b> in NYC and study foundational topics in <b>machine learning</b> and <b>optimization</b>, recently involving reinforcement learning, control, optimal transport, and geometry. I am interested in building learning systems that understand and interact with our world. I freely publish my research code to <a href="https://github.com/bamos">GitHub</a> as science should be open and reproducible and well-crafted software enables new frontiers. <br><br>

## <i class="fa fa-chevron-right"></i> Experiences
<table class="table table-hover">

<tr>
<td>
<p markdown="1" style='margin: 0'>
<strong>Machine Learning Engineer</strong><br>
Kaikutek inc. | Taipei<br>
• Research Field<br>
&ensp;&ensp;- Sub-actions exploration<br>
&ensp;&ensp;- Rapid gesture recognition<br>
&ensp;&ensp;- Temporal coherency<br>
• SDK Machine Learning Team Leader<br>
&ensp;&ensp;- Customers support, lead team members.<br>
&ensp;&ensp;- Deploy Python API to AWS cloud training platform.<br>
</p>
</td>
<td class='col-md-2' style='text-align:right;'>Feb 2020 - Current</td>
</tr>

<tr>
<td>
<p markdown="1" style='margin: 0'>
<strong>Military Service in Taiwan</strong>
</p>
</td>
<td class='col-md-2' style='text-align:right;'>Oct. 2019 - Feb. 2020</td>
</tr>

<tr>
<td>
<p markdown="1" style='margin: 0'>
<strong>Machine Learning Research Intern</strong><br>
Kaikutek inc. | Taipei<br>
• Research Field<br>
&ensp;&ensp;- Long-Tailed Object Recognition<br>
&ensp;&ensp;- Few-shot Learning<br>
</p>
</td>
<td class='col-md-2' style='text-align:right;'>Jul. 2019 - Oct. 2019</td>
</tr>

</table>


## <i class="fa fa-chevron-right"></i> Education

<table class="table table-hover">
  <tr>
    <td>
        <strong>M.Sc. in Electronic Engineering</strong>
        <br>
      National Chung Cheng University | Chiayi
        <p style='margin-top:-1em;margin-bottom:0em' markdown='1'>
        <br> *<a href="https://ieeexplore.ieee.org/document/9413146/figures#figures">DEN: Disentangling and Exchanging Network for Depth Completion</a>*
        <br> Advisor: <a href="http://acm.cs.nctu.edu.tw/Member_Home.aspx?Account=chingchun">Ching-Chun Huang</a>
        </p>
    </td>
    <td class="col-md-2" style='text-align:right;'>2017 - 2019</td>
  </tr>
  <tr>
    <td>
        <strong>B.Sc. in Electronic Engineering</strong>
        <br>
      National Kaohsiung University of Applied Sciences | Kaohsiung
        <p style='margin-top:-1em;margin-bottom:0em' markdown='1'>
        <br> Advisor: <a href="http://ee.nkust.edu.tw/control/jhy-shoung-yaung/">Chih-Hsiung Yang</a>
        </p>
    </td>
    <td class="col-md-2" style='text-align:right;'>2013 - 2017</td>
  </tr>
</table>


## <i class="fa fa-chevron-right"></i> Honors & Awards
<table class="table table-hover">
<tr>
  <td>
    <strong>MS THESIS AWARD HONORABLE MENTION in IPPR</strong><br>
	<p style="color:grey;font-size:1.2rem">
	You-Feng Wu, Vu-Hoang Tran, Ting-Wei Chang, Wei-Chen Chiu, Ching-Chun Huang, "DEN: Disentangling and Exchanging Network for Depth Completion", International Conference on Pattern Recognition(ICPR), Sep., 2020.<br>
	<a href="http://140.125.183.142/res/paperaword/13th/IPPR%E7%AC%AC%E5%8D%81%E4%B8%89%E5%B1%86%E5%8D%9A%E7%A2%A9%E5%A3%AB%E8%AB%96%E6%96%87%E7%8D%8E%E7%8D%B2%E7%8D%8E%E5%85%AC%E5%91%8A-2.pdf">"LINK"</a>
	</p>
  </td>
  <td class='col-md-2' style='text-align:right;'>2020</td>
</tr>
<tr>
  <td>
    <strong>BEST PAPER AWARD in MAPR</strong><br>
	<p style="color:grey;font-size:1.2rem">
		You-Feng Wu, Hoang Tran Vu, Ching-Chun Huang, "Semi-supervised and Multi-task Learning for On-street Parking Space Status Inference", Multimedia Analysis and Pattern Recognition (MAPR), May ., 2019.<br>
	<a href="http://acm.cs.nctu.edu.tw/News.aspx">"LINK"</a>
	</p>
  </td>
  <td class='col-md-2' style='text-align:right;'>2019</td>
</tr>
</table>


## <i class="fa fa-chevron-right"></i> Publications

<a href="https://scholar.google.com/citations?user=d8gdZR4AAAAJ" class="btn btn-primary" style="padding: 0.3em;">
  <i class="ai ai-google-scholar"></i> Google Scholar
</a>

<h2>2020</h2>
<table class="table table-hover">

<tr id="tr-amos2021modelbased" style="background-color: #E5EBF7">
<td class="col-md-3"><a href='https://github.com/Lilyo/DEN' target='_blank'><img src="images/publications/den.png" onerror="this.style.display='none'" style='border: none;' /></a> </td>
<td>
    <em><a href='https://ieeexplore.ieee.org/document/9413146' target='_blank'>DEN: Disentangling and Exchanging Network for Depth Completion</a> </em><br>
    <strong>You-Feng Wu</strong>, Vu-Hoang Tran, Ting-Wei Chang, Wei-Chen Chiu and Ching-Chun Huang<br>
    ICPR 2020<br>
    [1] 
[<a href='javascript:;'
    onclick='$("#abs_den").toggle()'>abs</a>] [<a href='https://github.com/Lilyo/DEN' target='_blank'>code</a>] <br>
    
<div id="abs_den" style="text-align: justify; display: none" markdown="1">
In this paper, we tackle the depth completion problem. Conventional depth sensors usually produce incomplete depth maps due to the property of surface reflection, 
especially for the window areas, metal surfaces, and object boundaries. 
However, we observe that the corresponding RGB images are still dense and preserve all of the useful structural information. 
The observation brings us to the question of whether we can borrow this structural information from RGB images to inpaint the corresponding incomplete depth maps. 
In this paper, we answer that question by proposing a Disentangling and Exchanging Network (DEN) for depth completion. 
The network is designed based on the assumption that after suitable feature disentanglement, RGB images and depth maps share a common domain for representing structural information. 
So we firstly disentangle both RGB and depth images into domain-invariant content parts, which contain structural information, and domain-specific style parts. 
Then, by exchanging the complete structural information extracted from the RGB image with incomplete information extracted from the depth map, we can generate the complete version of the depth map. 
Furthermore, to address the mixed-depth problem, a newly proposed depth representation is applied. 
By modeling depth estimation as a classification problem coupled with coefficient estimation, blurry edges are enhanced in the depth map. 
At last, we have implemented ablation experiments to verify the effectiveness of the proposed DEN model. 
The results also demonstrate the superiority of DEN over some state-of-the-art approaches.

</div>

</td>
</tr>

</table>

<h2>2019</h2>
<table class="table table-hover">

<tr id="tr-amos2021modelbased" style="background-color: #E5EBF7">
<td class="col-md-3"><a href='https://github.com/Lilyo/Parking-Space-Inference' target='_blank'><img src="images/publications/multi_task.gif" onerror="this.style.display='none'" style='border: none;' /></a> </td>
<td>
    <em><a href='http://dl.acm.org/citation.cfm?id=2685662' target='_blank'>Semi-supervised and Multi-task Learning for On-street Parking Space Status Inference</a> </em><br>
    <strong>You-Feng Wu</strong>, Hoang Tran Vu and Ching-Chun Huang<br>
    MAPR 2019  <br>
    [2] 
[<a href='javascript:;'
    onclick='$("#abs_multi_task").toggle()'>abs</a>] [<a href='https://github.com/Lilyo/Parking-Space-Inference' target='_blank'>code</a>] <br>
    
<div id="abs_multi_task" style="text-align: justify; display: none" markdown="1">
To manage on-street parking spaces, magnetic sensor is often used due to its low cost and flexibility in installation and usage. 
However, its signals are easily affected by environment, vehicle type, installation location and moving neighboring vehicles. 
Besides, accidental installation also leads to non-unified coordinate of magnetic sensors which makes the management system difficult to recognize. 
To overcome these challenges, we proposed a novel semi-supervised and multi-task learning framework for sensor based on-street parking slot inference with three contributions. 
First, a Coordinate Transform Module is integrated into our framework to reduce the diversity of input signals by transforming them adaptively into a unified coordinate. 
Second, to learn the generalized and discriminative features while minimizing the amount of labeled data, we introduce a Multi-task Module to leverage the information from both labeled and unlabeled data. 
Third, we embed a Temporal Module, which observes and memorizes the parking states from time to time, to infer parking space status in a reliable way. 
The experimental results show that, with the proposed three modules, our end-to-end training framework could reduce the error detection and hence improve the system accuracy.
</div>

</td>
</tr>

</table>


## <i class="fa fa-chevron-right"></i> Selected Projects

<h2>2021</h2>
<table class="table table-hover">

<tr id="tr-amos2021modelbased" style="background-color: #E5EBF7">
<td class="col-md-3"><a href='https://arxiv.org/pdf/1911.07574' target='_blank'><img src="images/publications/bias_aware_heapify_policy.png" onerror="this.style.display='none'" style='border: none;' /></a> </td>
<td>
    <em><a href='https://ieeexplore.ieee.org/document/9413146' target='_blank'>DEN: Disentangling and Exchanging Network for Depth Completion</a> </em><br>
    <strong>You-Feng Wu</strong>, Vu-Hoang Tran, Ting-Wei Chang, Wei-Chen Chiu and Ching-Chun Huang<br>
    ICPR 2021<br>
    [1] 
[<a href='javascript:;'
    onclick='$("#abs_amos2021modelbased").toggle()'>abs</a>] [<a href='https://github.com/facebookresearch/svg' target='_blank'>code</a>]  [<a href='http://bamos.github.io/data/slides/2021.svg.pdf' target='_blank'>slides</a>]  [<a href='https://youtu.be/ABS40GW7Ekk?t=5393' target='_blank'>talk</a>] <br>
    
<div id="abs_amos2021modelbased" style="text-align: justify; display: none" markdown="1">
Model-based reinforcement learning approaches add explicit domain
knowledge to agents in hopes of improving the
sample-efficiency in comparison to model-free
agents. However, in practice model-based methods are

</div>

</td>
</tr>

</table>

<h2>2020</h2>
<table class="table table-hover">

<tr id="tr-amos2021modelbased" style="background-color: #E5EBF7">
<td class="col-md-3"><a href='https://arxiv.org/pdf/1911.07574' target='_blank'><img src="images/publications/bias_aware_heapify_policy.png" onerror="this.style.display='none'" style='border: none;' /></a> </td>
<td>
    <em><a href='https://ieeexplore.ieee.org/document/9413146' target='_blank'>DEN: Disentangling and Exchanging Network for Depth Completion</a> </em><br>
    <strong>You-Feng Wu</strong>, Vu-Hoang Tran, Ting-Wei Chang, Wei-Chen Chiu and Ching-Chun Huang<br>
    ICPR 2021<br>
    [1] 
[<a href='javascript:;'
    onclick='$("#abs_amos2021modelbased").toggle()'>abs</a>] [<a href='https://github.com/facebookresearch/svg' target='_blank'>code</a>]  [<a href='http://bamos.github.io/data/slides/2021.svg.pdf' target='_blank'>slides</a>]  [<a href='https://youtu.be/ABS40GW7Ekk?t=5393' target='_blank'>talk</a>] <br>
    
<div id="abs_amos2021modelbased" style="text-align: justify; display: none" markdown="1">
Model-based reinforcement learning approaches add explicit domain
knowledge to agents in hopes of improving the
sample-efficiency in comparison to model-free
agents. However, in practice model-based methods are

</div>

</td>
</tr>

</table>

<h2>2019</h2>
<table class="table table-hover">

<tr id="tr-amos2021modelbased" style="background-color: #E5EBF7">
<td class="col-md-3"><a href='https://arxiv.org/pdf/1911.07574' target='_blank'><img src="images/publications/bias_aware_heapify_policy.png" onerror="this.style.display='none'" style='border: none;' /></a> </td>
<td>
    <em><a href='http://dl.acm.org/citation.cfm?id=2685662' target='_blank'>Semi-supervised and Multi-task Learning for On-street Parking Space Status Inference</a> </em><br>
    <strong>You-Feng Wu</strong>, Hoang Tran Vu and Ching-Chun Huang<br>
    SummerSim 2014  <br>
    [38] 
[<a href='javascript:;'
    onclick='$("#abs_andrew2014global").toggle()'>abs</a>]<br>
    
<div id="abs_andrew2014global" style="text-align: justify; display: none" markdown="1">
The complicated process by which a yeast cell divides, known as the cell
cycle, has been modeled by a system of 26 nonlinear ordinary differential
equations (ODEs) with 149 parameters. This model captures the chemical
kinetics of the regulatory networks controlling the cell division process
in budding yeast cells. Empirical data is discrete and matched against
discrete inferences (e.g., whether a particular mutant cell lives or dies)
computed from the ODE solution trajectories. The problem of
estimating the ODE parameters to best fit the model to the data is a
149-dimensional global optimization problem attacked by the deterministic
algorithm VTDIRECT95 and by the nondeterministic algorithms differential
evolution, QNSTOP, and simulated annealing, whose performances are
compared.
</div>

</td>
</tr>

</table>

<h2>2018</h2>
<table class="table table-hover">

<tr id="tr-amos2021modelbased" style="background-color: #E5EBF7">
<td class="col-md-3"><a href='https://arxiv.org/pdf/1911.07574' target='_blank'><img src="images/publications/bias_aware_heapify_policy.png" onerror="this.style.display='none'" style='border: none;' /></a> </td>
<td>
    <em><a href='http://dl.acm.org/citation.cfm?id=2685662' target='_blank'>Semi-supervised and Multi-task Learning for On-street Parking Space Status Inference</a> </em><br>
    <strong>You-Feng Wu</strong>, Hoang Tran Vu and Ching-Chun Huang<br>
    SummerSim 2014  <br>
    [38] 
[<a href='javascript:;'
    onclick='$("#abs_andrew2014global").toggle()'>abs</a>]<br>
    
<div id="abs_andrew2014global" style="text-align: justify; display: none" markdown="1">
The complicated process by which a yeast cell divides, known as the cell
cycle, has been modeled by a system of 26 nonlinear ordinary differential
equations (ODEs) with 149 parameters. This model captures the chemical
kinetics of the regulatory networks controlling the cell division process
in budding yeast cells. Empirical data is discrete and matched against
discrete inferences (e.g., whether a particular mutant cell lives or dies)
computed from the ODE solution trajectories. The problem of
estimating the ODE parameters to best fit the model to the data is a
149-dimensional global optimization problem attacked by the deterministic
algorithm VTDIRECT95 and by the nondeterministic algorithms differential
evolution, QNSTOP, and simulated annealing, whose performances are
compared.
</div>
</td>
</tr>

</table>


## <i class="fa fa-chevron-right"></i> Invited Talks
<table class="table table-hover">
<tr>
  <td>
        <strong>Machine Learning Course - Fine-tuning : Essential Training</strong><br>
		Artificial intelligence and machine learning are changing the world. In this lecture, we are going to introduce: (1)Everything a marketer needs to know about machine learning, (2) How to efficiently fine-tune model.
  </td>
  <td class='col-md-1' style='text-align:right;'>2021</td>
</tr>
</table>


## <i class="fa fa-chevron-right"></i> Skills
<table class="table table-hover">
<tr>
  <td class='col-md-2'>Programming Languages</td>
  <td>
Python, MATLAB, C, C++, JAVA
  </td>
</tr>
<tr>
  <td class='col-md-2'>Deep Learning Frameworks</td>
  <td>
PyTorch, TensorFlow, Caffe
  </td>
</tr>
<tr>
  <td class='col-md-2'>GUI Tools</td>
  <td>
PyQt5, wxPython
  </td>
</tr>
<tr>
  <td class='col-md-2'>Misc.</td>
  <td>
Linux, vim, git, tmux, LATEX
  </td>
</tr>
</table>
