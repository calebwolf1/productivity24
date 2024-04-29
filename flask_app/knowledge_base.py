import nest_asyncio
from typing import List, Dict

nest_asyncio.apply()
from llama_index.core.evaluation import generate_question_context_pairs
from llama_index.core import VectorStoreIndex, Document
from llama_index.core.node_parser import SimpleNodeParser
from llama_index.core.evaluation import RetrieverEvaluator
from llama_index.llms.openai import OpenAI
from llama_index.readers.json import JSONReader
from llama_index.core import Settings

import os
import pandas as pd
from dotenv import load_dotenv
load_dotenv()

class KnowledgeBase:
    def __init__(self, chunk_size=512):
        print('inside init')
        documents = JSONReader(is_jsonl = True).load_data("data/converted_conversations.jsonl")
        #documents = JSONReader(is_jsonl = True).load_data("data/test_diff.jsonl")

        # define an LLM (3.5 turbo)
        Settings.llm = OpenAI(model="gpt-3.5-turbo")

        # build index with a chunk_size of 512 -- do we need to update chunk size?
        node_parser = SimpleNodeParser.from_defaults(chunk_size)
        nodes = node_parser.get_nodes_from_documents(documents)
        self.vector_index = VectorStoreIndex(nodes)
        self.query_engine = self.vector_index.as_query_engine()

    # body of email
    def generate_response(self, email:str):
        print('inside generate_response in KnowledgeBase')
        print(self.query_engine)
        self.query_engine = self.vector_index.as_query_engine(similarity_top_k = 3)
        # print('printing query engine multiple responses')
        # print(self.query_engine.query(email).response)
        response_vector = self.query_engine.query(email)
        print(response_vector.metadata)
        return response_vector.response
        # print('response stream')
        # response = response_vector.print_response_stream()
        # print(response)
        # return response.response_gen
    
    def update_knowledge_base(self, emails:List[Dict[str, str]]):
        print('inside update_knowledge_base in KnowledgeBase')
        # assume thread is list of 2 emails
        for thread in emails:
            assert(len(thread)==2)
            doc = Document(text=(thread['incoming'] + '\n' + thread['outgoing']))
            self.vector_index.insert(doc)

# hello!!!
        