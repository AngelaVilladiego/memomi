import numpy as np
import cohere
import os
from dotenv import load_dotenv
import os
load_dotenv()
api_key = os.getenv("COHERE_API_KEY")


from sklearn.cluster import KMeans


class notesCluster:
    def __init__(self, api_key, num_generations: int = 1, temperature=0.6):
        """
        Parameters
        ----------
            co: Python cohere SDK object
            prompt: str
                The text prompt the generative model uses to name a cluster
            num_generations: int
                The number of candidate generations to get for each cluster. Multiple generations can enhance the quality of cluster names.
            temperature: float
                Typically between 0-1, the temperature value used to control the randomness of the generation model. Lower values lead to more predictable, less "creative" names.

        """
        self.co = cohere.Client(api_key)
        self.num_generations = num_generations
        self.temperature = temperature
    
    def generate_embeddings(self, texts):
        #print(texts)
        embeddings = np.array(self.co.embed(texts=texts).embeddings)
        return embeddings
    
    def cosine_similarity(self, A, B):
        return np.dot(A,B)/(np.linalg.norm(A)*np.linalg.norm(B))
    
    def cluster_embeddings(self, embeddings, n_clusters = 4):
        # Cluster the embeddings
        model = KMeans(n_clusters=n_clusters, n_init="auto", random_state=0)
        model.fit(embeddings)
        return model.labels_
    
    def groupby_cluster(self, texts, labels, n_clusters = 4):
        clusters = {i:[] for i in range(n_clusters)}
        for i in range(len(texts)):
            clusters[labels[i]].append(texts[i])
        return clusters
            
    def name_cluster(self, clusters):
        names = {}
        for i, texts in clusters.items():
            
            prompt = 'The following texts are from the same cluster. Please generate one single word that represent the cluster and surround it with quotes'
            # if i > 0:
            #     prompt += "do not use this word : "
            #     for name in names:
            #         prompt += name + ", "
            #prompt += "\nHere are the texts:\n"
            for i, text in enumerate(texts):
                prompt += f"{str(i)}. {text}\n"
            response = self.co.generate(
                model='command-nightly',
                prompt=prompt,
                max_tokens=300,
                temperature=0.9,
                k=1,
                p=0.75,
                stop_sequences=[],
                return_likelihoods='NONE')
            
            print("----------")
            response_with_quote = response.generations[0].text
            
            start_pt = response_with_quote.find("\"")
            end_pt = response_with_quote.find("\"", start_pt + 1)  # add one to skip the opening "
            name = response_with_quote[start_pt + 1: end_pt]
            print(name)
            names[name] = texts
        return names
            
    def make_prompt(self, texts, n_clusters):
        embeddings = self.generate_embeddings(texts)
        labels = self.cluster_embeddings(embeddings, n_clusters=n_clusters)
        clusters = self.groupby_cluster(texts, labels, n_clusters=n_clusters)
        #return clusters
        return self.name_cluster(clusters)
    
    
    
nc = notesCluster(api_key=api_key)
notes = [
    "Math can be a very powerful tool in many areas of life.",
    "There is beauty and creativity in mathematics.",
    "Economics explores the production, distribution, and consumption of goods and services within societies, analyzing the behavior of individuals, businesses, and governments.",
    "Its theories and models provide insights into factors influencing markets, prices, employment, and overall economic growth.",
    "Hockey is a sport that involves teamwork, speed, and skill on an ice rink, where players use sticks to shoot a puck into the opposing team's goal.",
    "Basketball is a fast-paced sport that emphasizes teamwork, strategy, and precise shooting. Players score points by putting a spherical ball through a hoop elevated 10 feet above the ground, all while adhering to the game's rules and dynamics."
]
clusters = nc.make_prompt(notes, n_clusters=3)
#print(clusters)
for cluster in clusters:
    print(cluster)
    for text in clusters[cluster]:
        print(text)
        
        
    