# Tentroll

Trolling with NodeJS, Python, Docker, Tensorflow.

### What is trolling?

Making a deliberately offensive or provocative online post with the aim of upsetting someone or eliciting an angry response from them.

### Motivation 

Trolling and Memes are cultural internet phenomenon. 

Tests and experiments are necessary to understand how automated activities can impact online communities. 

## Tensorflow

First, I recommend you complete this [tutorial](https://codelabs.developers.google.com/codelabs/tensorflow-for-poets).

I've restructured things a bit, and pathing is probably the hardest part of using this, because of docker, tensorflow, python, node, etc...

Lets assume you clone this repo into your home folder.

Clone this repo:

```
cd ;
git clone git@github.com:OR13/tentroll.git
cd tentroll/tf_files
mkdir image_data
```

`image_data` is not checked into source (and should not be!). 

Each folder in this directory will contain training samples for a class.

In our case, `isis, gays, trump_fans`. You can build your own classes...

## Install Node Dependencies

```
npm install 
brew install ghostscript
brew install graphicsmagick
```

### Collecting Training Data

- [Download Images from Google Search](https://chrome.google.com/webstore/detail/fatkun-batch-download-ima/nnjjahlikiabnchcpehcpkdeckfgnohf?hl=en)
- Other recommendations welcome...

### Docker

Start docker and link this repo as follows:

```
docker run -it -v $HOME/tentroll/tf_files:/tf_files gcr.io/tensorflow/tensorflow:latest-devel 

# if you didn't start with the tutorial, you may need to
cd /tensorflow
git pull

```

### Retrain an Image classifier for your classes

```
# from the root directory of docker.
python /tensorflow/tensorflow/examples/image_retraining/retrain.py \
--bottleneck_dir=/tf_files/bottlenecks \
--how_many_training_steps 500 \
--model_dir=/tf_files/inception \
--output_graph=/tf_files/retrained_graph.pb \
--output_labels=/tf_files/retrained_labels.txt \
--image_dir /tf_files/image_data
```

### Test your classifier on some new content
```
python /tf_files/classify.py /tf_files/test_data/0.jpg

```

## Attacking



### Maybe in the future...
http://www.sno.phy.queensu.ca/~phil/exiftool/

