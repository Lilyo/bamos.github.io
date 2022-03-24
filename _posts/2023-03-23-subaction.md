---
layout: post
title: "Exploring Sub-Actions via Node Attention Module"
tags: [Linux,Python]

---
<ul id="toc"></ul>

---
<div id="" style="text-align: justify;" markdown="1">
This article introduces how I designed *Node Attention Module* from scratch under certain conditions. 
Our goal is to provide a plug-and-play module to extract sub-actions upon any existing action detection approaches.
</div>
---

<a id="fig1"></a>
{% include image.html
   img="/data/subaction/demo.gif"
   caption="Fig. 1, [[19][Hou_2017_BMVC]] A complex human activity usually is sub-divided into unit-actions."
%}



<div id="" style="text-align: center;" markdown="1">
__An one-fits-all HCI solution extracts generic sub-actions that shared across dataset.__
</div>

<div id="" style="text-align: justify;" markdown="1">
Deep Learning models are state-of-the-art for action recognition tasks but frequently treat the complex activities as the singular objectives
and lack interpretability. Therefore, recent works started to tackle the problem of exploration of sub-actions in complex activities. 
In this article, we introduce a novel approach to explore the temporal structure of detected action instances by explicitly modeling 
sub-actions and benefit from them. To this end, we propose to learn sub-actions as latent concepts and explore sub-actions via *Node Attention Module (NAM)*. 
The proposed method maps both visual and temporal representations to a latent space where the sub-actions are learned discriminatively in an end-to-end fashion. 
The result is a set of latent vectors that can be interpreted as cluster centers in the embedding space. *NAM* is highly modular and extendable. 
It can be easily combined with exist deep learning model for various other video-related tasks in the future. 
</div>

---

### Introduction

<a id="fig2"></a>
{% include image.html
   img="/data/subaction/hussein2019videograph.png"
   caption="Fig. 2, [[3][hussein2019videograph]] The activity of “preparing coffee” can be represented as undirected graph of unit-actions."
%}

<div id="" style="text-align: justify;" markdown="1">
In recent years, deep learning has dominated many computer vision tasks, especially in action recognition, 
which is an important research filed to study almost all real-world videos contain multiple actions, and each action is composed of several sub-actions. As shown in <a href="#fig2">Fig.2</a>, 
[[3][hussein2019videograph], [17][Piergiovanni2017Subevents], [14][Piergiovanni_2018_CVPR]], for instance, the activity of "preparing coffee" can be represented as undirected graph of unit-actions,
 include "take cup", "pour coffee", "pour sugar" and "stir coffee".

<a id="fig3"></a>
{% include image.html
   img="/data/subaction/Piergiovanni2017Subevents.png"
   caption="Fig. 3, [[17][Piergiovanni2017Subevents]] In the video of a basketball game, shooting and blocking events must occur near-by."
%}

Furthermore, detecting the frames of one activity in the video should benefit from information in the frames corresponding to another activity.
As shown in <a href="#fig3">Fig.3</a>, a block event cannot occur without a shot event.



<a id="fig4"></a>
{% include image.html
   img="/data/subaction/Huang2021Modeling.png"
   caption="Fig. 4, [[16][Huang2021Modeling]] Different action instances can share similar motion patterns."
%}
By the same token, a complex action is inherently the temporal composition of sub-actions, which means sub-actions may have contextual relations, or in other words, sub-actions of the same action should simultaneously appear in the corresponding video.
As shown in <a href="#fig4">Fig.4</a>, e.g., the “jump” sub-action in the red box will always appear in its intra-class instances, and also be shared across several action as well.

</div>

---

### Challenges

Action recognition is the problem of identifying events performed by humans given a video input, there are two primary challenges:
+ Many high-level activities are often composed of multiple temporal parts with different duration/speed.

	--> **Implicitly modeling sub-action to preserve essential properties**

+ Usually given video- /frame- level category labels, the sub-actions are undefined and not annotated. 

	--> **Represent video features via a group of sub-actions, i.e., the sub-action family.**

---

### Problem Formulation

**We would like to perform frame-wise inference.** Existing approaches try to explore sub-actions from a given video frame 
[[17][Piergiovanni2017Subevents], [14][Piergiovanni_2018_CVPR]], or given video segments [[15][Long_2019_CVPR], [12][swetha2021unsupervised]]. 
Among them, those approaches using video segments as input need to rely on multiple timestamp inputs to extract features, which means that several timestamp information must be considered as input to capture context from adjacent frames. 


Learning to represent videos is important. It requires embedding spatial and temporal information in a series of frames. 
Convolutional Neural Network (CNN) followed with a Recurrent Neural Network (RNN) is a backbone network widely used to extract spatiotemporal information. 
In the past few years, some research tend to extract spatiotemporal information through 3D convolutional networks have gradually received a great amount of attention, such as I3D [[18][Carreira_2017_CVPR]]. 
In this article, we tend to use recursive-based methods (such as CNN with RNN) instead of 3D convolutional networks since consideration of the efficiency of real-time per-frame inference and the model size.

---

### Proposed Model

<div id="" style="text-align: justify;" markdown="1">
**Node Attention Learning**

<a id="fig5"></a>
{% include image.html
   img="/data/subaction/hussein2019videograph2.png"
   caption="Fig. 5, [[3][hussein2019videograph]] Demostraction of our sub-action result."
%}

Inspired by [[3][hussein2019videograph]], in a dataset of human activities, unit-actions can be thought of as the dominant latent short-range concepts. 
That is, unit-actions are the building blocks of the human activity. As shown in <a href="#fig5">Fig.5</a>, in order to the associating sub-actions across each actions, we introduce a set of vectors as a memory bank of sub-action templates, 
which then serve as our sub-action pool and will be projected to meaningful latent space, we called latent concepts.

There are three key points worth to be mentioned:
1. The sub-action family contains multiple feature vectors, where each vector is in charge of representing a specific sub-action.
2. The sub-action family is automatically discovered and shared among all actions in the dataset, while all actions contribute to the learning of the sub-action family.
3. The number of sub-actions is automatically determined and they are found to be semantically meaningful.

<a id="fig6"></a>
{% include image.html
   img="/data/subaction/hussein2019videograph3.png"
   caption="Fig. 6, [[3][hussein2019videograph]] Demostraction of our sub-action result."
%}

Although the properties of this work meets our goal, there are some concerns. First of all, it can not perform frame-wise inference.
Second, this model is hard to learn since it has asked to learn the relationship of each nodes by itself.
To tackle it, we have made the following modifications: (1) the embedding network extracts per-frame deep features by using 2D CNN instead of 3D networks.
(2) we borrow the way of learn relationship of each nodes from paper [[12][swetha2021unsupervised]].


<div id="" style="text-align: justify;" markdown="1">
**Sub-Action Exploration Loss** 
<a id="fig7"></a>
{% include image.html
   img="/data/subaction/swetha2021unsupervised.png"
   caption="Fig. 7, [[12][swetha2021unsupervised]] Unsupervised sub-action learning in complex activities."
%}

As shown in <a href="#fig7">Fig.7</a>, [[12][swetha2021unsupervised]]'s objective is to learn latent concepts which can be represented as the potential sub-actions. 
The similarity between the latent concepts of the same sub-action and the maximum confident input features is maximized, while the similarity w.r.t other input features is minimized. 

<a id="fig8"></a>
{% include image.html
   img="/data/subaction/cmp.png"
   caption="Fig. 8, Disentangle latent concept learning."
%}

Different from [[12][swetha2021unsupervised]], we only consider k-th self-similarity (<a href="#fig8">Fig.8(b)</a>) instead of summary of latent concepts (<a href="#fig8">Fig.8(a)</a>).
</div>

<div id="" style="text-align: justify;" markdown="1">

**Additional Constraints** 
+ **Diversity Loss** 
In terms of diversity exploration, we design a diversity loss to encourage each projected sub-action templates in the memory bank is different from other templates (to be unique). 
This loss is calculated as the mean value of pairwise similarities for all sub-actions. 
More specific, the pairwise similarity between each sub-action is measured with the dot product, it then aims to approximate to identity matrix by applying the Frobenius norm. 
Doing so makes the sub-actions inter-independent. 
</div>

<div id="" style="text-align: justify;" markdown="1">
+ **Background Suppression Regularization** 
Since *Sub-Action Exploration Loss* encourages only foreground segments to produce high logits for specific sub-actions, means that background segments do not be supervised. 
As mentioned in [[13][Lee2020BackgroundMV]], the softmax scores for some background segments could be high due to the relativeness of softmax function. 
Moreover, while the diversity loss encourages the latent concepts in the memory bank to be unique, it does not guarantee that each latent concepts in the memory bank is meaningful. 
For instance, a latent concept may not represent a sub-action and have low similarities with all input features during training. 
To tackle this, we follow [[13][Lee2020BackgroundMV]] to forced background segments to have uniform probability distribution over sub-actions. 
Doing so it can prevent background segments from having a high score for any sub-actions.
</div>

<div id="" style="text-align: justify;" markdown="1">
+ **Length Regularization** 
The idea behind having *NAM* is that **"An action must consist of at least two sub-actions"**. 
To this end, we introduce a proportional compression regularization term with an action summary ratio, similar with 
[[10][ping2021exploring]], which penalizes where length of explored sub-action too long and avoids it becomes trivial solution.
</div>

<div id="" style="text-align: justify;" markdown="1">
+ **Foreground Entropy Regularization** 
We further introduce a standard entropy regularization term for foreground segments, it aims to directly encourage less entropic
(more peaky) distributions. Contrary to *Background Suppression Regularization*, the goal of entropy regularization is to alter the
attention maps, by biasing it towards low entropy.
</div>

---

### Why Plug and Play? Why is Plug and Play needed?
You might think that [[3][hussein2019videograph]] has already dealt with both action and sub-actions detection task from the perspective of the graph theory, and we proposed an alternative way to improve the performance as well, 
why we still need plug and play? Indeed, [[3][hussein2019videograph]] is a multi-task learning method, which significantly degrades the performance of action detection due to the dependency of sub-action family representations.
That's why we've positioned our approach to *Plug and Play*. 

In our work, given a trained action detection model, we just simply freeze the weights and apply *NAM* to extract sub-actions. 
Which means that we tackle this problem in two stages, where during the first stage an embedding based on visual and temporal information is learned, and in the second stage clustering is applied on this embedding space.

---

### Interface Design
We present a plug-and-play python module based on pytorch framework. An example of using our module is as follows.

{% highlight Python %}
def NodeAttentionModule(x):
    # x: feature tensor, output of RNN backbone
    # x’s size: (B, T, D)
    # nodes: node tensor, must be initialized at beginning
    # nodes’s size: (D, N)
    
    # Q path
    x = relu(bn(x))
    x = fc_x(x)

    # K path
    n = relu(bn2(nodes))
    n = fc_n(n)

    # Q and K path
    A = matmul(x, n)
    A = softmax(A, dim=-1)
    
    return A
{% endhighlight %}

---

### Results

<a id="fig9"></a>
{% include image.html
   img="/data/subaction/output.png"
   caption="Fig. 9, Visualization of our sub-action result."
%}

---

### Conclusions and Future Work
First, our framework uses prototypes to represent sub-actions, which can be automatically learned in an end-to-end way. 
Second, the sub-action mechanism directly learns from individual videos and does not require triplet samples, which avoids the complicated sampling process. 
Besides, in the learning process, all videos interact with the same sub-action family, which provides a holistic solution to study all available videos. 
Moreover, the proposed method performs at the sub-action level and bridges videos from different categories together. 
We proposed a plug-and-play *Node Exploration Module (NEM)* to predicts the action units within an action in videos. 
To our knowledge, this is the first work exploring a plug-and-play module for sub-action representation learning, capturing temporal structure and relationships within an action. 

---

### References

[[1][kaidi2019fewshot]]
Cao, Kaidi, et al. Few-shot video classification via temporal alignment.
Proceedings of the IEEE/CVF Conference on Computer Vision and Pattern Recognition. 2020.


[[2][rahman2016optimizing]] Md Atiqur Rahman and Yang Wang. Optimizing
intersection-over-union in deep neural networks for image
segmentation. In Advances in Visual Computing, pages
234–244, Cham, 2016. Springer International Publishing.


[[3][hussein2019videograph]] Noureldien Hussein, Efstratios Gavves, and Arnold W. M.
Smeulders. Videograph: Recognizing minutes-long human
activities in videos, 2019.

[[4][li2017concurrent]] Xinyu Li, Yanyi Zhang, Jianyu Zhang, Shuhong Chen,
Ivan Marsic, Richard A. Farneth, and Randall S. Burd.
Concurrent activity recognition with multimodal cnn-lstm
structure, 2017.

[[5][Donahue_2015_CVPR]] Jeffrey Donahue, Lisa Anne Hendricks, Sergio Guadar-
rama, Marcus Rohrbach, Subhashini Venugopalan, Kate
Saenko, and Trevor Darrell. Long-term recurrent convolu-
tional networks for visual recognition and description. In
Proceedings of the IEEE Conference on Computer Vision
and Pattern Recognition (CVPR), June 2015.


[[6][Sigurdsson_2017_CVPR]] Gunnar A. Sigurdsson, Santosh Divvala, Ali Farhadi, and
Abhinav Gupta. Asynchronous temporal fields for action
recognition. In Proceedings of the IEEE Conference on
Computer Vision and Pattern Recognition (CVPR), July 2017.

[[7][Xu_2017_ICCV]] Huijuan Xu, Abir Das, and Kate Saenko. R-c3d: Region
convolutional 3d network for temporal activity detection.
In Proceedings of the IEEE International Conference on
Computer Vision (ICCV), Oct 2017.


[[8][Tran_2018_CVPR]] Du Tran, Heng Wang, Lorenzo Torresani, Jamie Ray, Yann
LeCun, and Manohar Paluri. A closer look at spatiotem-
poral convolutions for action recognition. In Proceedings
of the IEEE Conference on Computer Vision and Pattern
Recognition (CVPR), June 2018.


[[9][zhenzhi2020boundary]] Limin Wang Zhifeng Li Zhenzhi Wang, Ziteng Gao and
Gangshan Wu. Boundary-aware cascade networks for
temporal action segmentation. In Computer Vision – ECCV
2020, pages 34–51, Cham, 2020. Springer International
Publishing. ISBN 978-3-030-58595-2.

[[10][ping2021exploring]] Ping Li, Qinghao Ye, Luming Zhang, Li Yuan, Xianghua
Xu, and Ling Shao. Exploring global diverse atten-
tion via pairwise temporal relation for video summariza-
tion. Pattern Recognition, 111:107677, 2021. ISSN 0031-3203. doi: https://doi.org/10.1016/j.patcog.2020. 107677. URL https://www.sciencedirect.com/
science/article/pii/S0031320320304805.

[[11][Luo_2021_CVPR]] Wang Luo, Tianzhu Zhang, Wenfei Yang, Jingen Liu, Tao
Mei, Feng Wu, and Yongdong Zhang. Action unit memory
network for weakly supervised temporal action localiza-
tion. In Proceedings of the IEEE/CVF Conference on
Computer Vision and Pattern Recognition (CVPR), pages
9969–9979, June 2021.

[[12][swetha2021unsupervised]] Sirnam Swetha, Hilde Kuehne, Yogesh S Rawat, and
Mubarak Shah. Unsupervised discriminative embedding
for sub-action learning in complex activities, 2021.

[[13][Lee2020BackgroundMV]] Pilhyeon Lee, Jinglu Wang, Yan Lu, and H. Byun. Back-
ground modeling via uncertainty estimation for weakly-
supervised action localization. ArXiv, abs/2006.07006, 2020.


[[14][Piergiovanni_2018_CVPR]] AJ Piergiovanni and Michael S. Ryoo. Learning latent
super-events to detect multiple activities in videos. In
Proceedings of the IEEE Conference on Computer Vision
and Pattern Recognition (CVPR), June 2018.


[[15][Long_2019_CVPR]] Fuchen Long, Ting Yao, Zhaofan Qiu, Xinmei Tian, Jiebo
Luo, and Tao Mei. Gaussian temporal awareness networks
for action localization. In Proceedings of the IEEE/CVF
Conference on Computer Vision and Pattern Recognition
(CVPR), June 2019.

[[16][Huang2021Modeling]] Linjiang Huang, Yan Huang, Wanli Ouyang, and Liang
Wang. Modeling sub-actions for weakly supervised tem-
poral action localization. IEEE Transactions on Image
Processing, 30:5154–5167, 2021. doi: 10.1109/TIP.2021.
3078324.

[[17][Piergiovanni2017Subevents]] A. J. Piergiovanni, Chenyou Fan, and Michael S. Ryoo.
Learning latent subevents in activity videos using tem-
poral attention filters. In Proceedings of the Thirty-First
AAAI Conference on Artificial Intelligence, AAAI’17, page
4247–4254. AAAI Press, 2017.

[[18][Carreira_2017_CVPR]] Joao Carreira and Andrew Zisserman. Quo vadis, action
recognition? a new model and the kinetics dataset. In
Proceedings of the IEEE Conference on Computer Vision
and Pattern Recognition (CVPR), July 2017.

[[19][Hou_2017_BMVC]] Hou, Rui, Rahul Sukthankar, and Mubarak Shah. 
Real-Time Temporal Action Localization in Untrimmed Videos by Sub-Action Discovery.
BMVC. Vol. 2. 2017.

---

[github]: https://github.com/Lilyo

[kaidi2019fewshot]: https://openaccess.thecvf.com/content_CVPR_2020/papers/Cao_Few-Shot_Video_Classification_via_Temporal_Alignment_CVPR_2020_paper.pdf
[rahman2016optimizing]:http://cs.umanitoba.ca/~ywang/papers/isvc16.pdf
[hussein2019videograph]: https://arxiv.org/abs/1905.05143
[li2017concurrent]: https://arxiv.org/abs/1702.01638
[Donahue_2015_CVPR]: https://openaccess.thecvf.com/content_cvpr_2015/papers/Donahue_Long-Term_Recurrent_Convolutional_2015_CVPR_paper.pdf
[Sigurdsson_2017_CVPR]: https://openaccess.thecvf.com/content_cvpr_2017/papers/Sigurdsson_Asynchronous_Temporal_Fields_CVPR_2017_paper.pdf
[Xu_2017_ICCV]: https://openaccess.thecvf.com/content_ICCV_2017/papers/Xu_R-C3D_Region_Convolutional_ICCV_2017_paper.pdf
[Tran_2018_CVPR]: https://openaccess.thecvf.com/content_cvpr_2018/papers/Tran_A_Closer_Look_CVPR_2018_paper.pdf
[zhenzhi2020boundary]: https://www.ecva.net/papers/eccv_2020/papers_ECCV/papers/123700035.pdf
[ping2021exploring]: https://www.sciencedirect.com/science/article/abs/pii/S0031320320304805
[Luo_2021_CVPR]: https://openaccess.thecvf.com/content/CVPR2021/papers/Luo_Action_Unit_Memory_Network_for_Weakly_Supervised_Temporal_Action_Localization_CVPR_2021_paper.pdf
[swetha2021unsupervised]: https://arxiv.org/abs/2105.00067
[Lee2020BackgroundMV]: https://arxiv.org/pdf/2006.07006.pdf
[Piergiovanni_2018_CVPR]: https://openaccess.thecvf.com/content_cvpr_2018/papers/Piergiovanni_Learning_Latent_Super-Events_CVPR_2018_paper.pdf
[Long_2019_CVPR]: http://staff.ustc.edu.cn/~xinmei/publications_pdf/2019/Gaussian%20Temporal%20Awareness%20Networks%20for%20Action%20Localization.pdf
[Huang2021Modeling]: https://ieeexplore.ieee.org/document/9430747
[Piergiovanni2017Subevents]: https://www.aaai.org/ocs/index.php/AAAI/AAAI17/paper/download/15005/14307
[Sener_2018_CVPR]: https://openaccess.thecvf.com/content_cvpr_2018/papers/Sener_Unsupervised_Learning_and_CVPR_2018_paper.pdf
[Carreira_2017_CVPR]: https://openaccess.thecvf.com/content_cvpr_2017/papers/Carreira_Quo_Vadis_Action_CVPR_2017_paper.pdf
[Hou_2017_BMVC]: http://www.bmva.org/bmvc/2017/papers/paper091/paper091.pdf