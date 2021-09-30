import setuptools

with open("README.md", "r", encoding="utf-8") as fh:
    long_description = fh.read()

setuptools.setup(
    name="ReadME",
    version="1.0.0",
    author="CSC510 - Group17",
    author_email="csc510project21@gmail.com",
    description="ReadMe is a web application that gathers articles from the internet and recommends them to users depending on their likes.",
    long_description= long_description,
    long_description_content_type="text/markdown",
    url="https://github.com/niveditalodha/ReadME",
    project_urls={
        "Bug Tracker": "https://github.com/niveditalodha/ReadME/issues",
    },
    classifiers=[
        "License :: OSI Approved :: MIT License",
        "Programming Language :: Python",
        "Intended Audience :: Developers",
        "Topic :: ReadME",
    ],
    #package_dir={"": "src"},
    #packages=setuptools.find_packages(where="src"),
    python_requires='>=3.7'
)