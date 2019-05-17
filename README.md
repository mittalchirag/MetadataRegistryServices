<h1 align="center"><img src="https://svgshare.com/i/D9V.svg" alt="Metadata Registry Services" /></h1>
<h4 align="center">Open Source registry designed to provide services for creation, storage and search of Metadata</h4>

<br>

## What is it?

Organizations such as Ramaiah Group possess a voluminous amount of heterogeneous data. Such organizations need a solution to create a support system to aid in the process of decision making. In recent times with the advancements of data mining applications, there is an explosion in the amount of data and data-driven applications. Current systems based on traditional databases are not scalable and do not capture the depth and complexity of the data. These systems are not able to utilize the power of the data they possess. Access to the aggregate and relations of the data can be nearly impossible without the investment of capital and man-hours dedicated to expanding the utility of the data.

One of the central challenges with the development of the KRs is to enable the capture, representation, and retrieval
of metadata. Metadata is the descriptive information about the data items in the KRs which aids in the retrieval of relevant data items. Data items can be searched and aggregated with the help of their metadata. 

Metadata Registry services is an open source metadata registry that is suited for data-driven research. A service-oriented architecture is employed in building such a registry which provides each functionality of the registry as
loosely-coupled services, namely; Metadata Creation Service, Metadata Storage Service, Metadata Search Service, and Access Control Service. These services are made available to its consumers (either directly by an end-user or indirectly by a machine) via RESTful APIs. 

![Web Application Snapshot](https://imgur.com/XyngmeO.png)

## Tech Stack

### Architecture: 

[Service Oriented](<https://en.wikipedia.org/wiki/Service-oriented_architecture>) (Each functionality is available as a loosely-coupled service)

### Development Stack:

1. Front-End
   * HTML
   * CSS
   * Bulma CSS
   * JavaScript
   * AngularJS
2. Back-End
   * ExpressJS
   * NodeJS
   * Elasticsearch
3. Database
   * MonogDB
4. Tools
   * REST API
   * JSON
   * Postman
   * JMeter



## Setting up using Vagrant

The instructions below will setup an instance of the development environment of the Metadata Registry Services Project on your own hardware that will have all the developed services, with some dummy data. Your host computer can run any modern operating system (Windows, Mac, or Unix/Linux). The installation process will create a new Virtual Machine (VM) on your computer and the VM will use the Ubuntu GNU/Linux operating system.

1. To develop with a Virtual Machine (VM), your computer should have at least 8GB of RAM and a 64-bit host OS. AMD-V or Intel VT-x are also required (most computers have these). 

2. Enable [Virtualization](http://tinyurl.com/enable-virtualization)

   **Mac Instructions**
   Virtualization is generally enabled by default

   **Windows 10 Instructions**
   Open Settings, navigate to *Advanced Startup* and select *Restart Now*. ![Relevant Screenshot](https://github.com/jaredsexton/submitty.github.io/blob/master/images/Virtualization_Instructions_1.png?raw=true)

   Navigate to *Troubleshoot -> Advanced Options -> UEFI Firmware Settings* and restart as suggested.

   Navigate to *BIOS Settings* from your PC’s startup menu, locate *Virtualization Technology* and enable it.

   **Ubuntu Instructions**
   Enter BIOS (generally by pressing Del or F12 while booting) and navigate the *BIOS Settings*, locate *Virtualization*, and enable it.

   Be sure to choose *Hardware Virtualization* in the *System -> Acceleration* settings of the virtual machine you are using.

   **NOTE** If using secure boot, vagrant may fail to work with VirtualBox. You will then either need to disable secure boot from the boot menu/BIOS or follow [these steps](https://era86.github.io/2018/01/24/vagrant-virtualbox-secureboot-in-ubuntu-1604.html) to self-sign the necessary packages to run vagrant and VirtualBox.

3. Download and install [VirtualBox](https://www.virtualbox.org/), [Vagrant](https://www.vagrantup.com/).

   Below are quick steps to get everything installed and running.

   **Windows Installation**
   You can just go to the respective sites and download the necessary binaries.

   **Mac Installation** You can either go to respective sites and download the necessary binaries or install [homebrew](http://brew.sh/) if you don’t have it and then run:

   ```
   brew cask install virtualbox
   brew cask install vagrant
   
   ```

   **Ubuntu/Debian Installation**

   **NOTE:** The Ubuntu repository does not contain the latest version of Vagrant or VirtualBox and using them may not work nor are they supported. We recommend that you either download the necessary binaries from their respective steps or follow the steps outlined below for each: VirtualBox: https://www.virtualbox.org/wiki/Linux_Downloads Vagrant: https://vagrant-deb.linestarve.com/

4. Install [vagrant-vbguest](https://github.com/dotless-de/vagrant-vbguest).

   Open your terminal/cmd.exe and run:

   ```
   vagrant plugin install vagrant-vbguest
   
   ```

   Note: You will want to run `vagrant plugin update` every once in a while to keep the plugin up-to-date.

5. Clone [the Metadata Registrly Services Repository](https://github.com/mittalchirag/MetadataRegistryServices) to a location on your computer (the “host”).

   ```
   git clone https://github.com/mittalchirag/MetadataRegistryServices.git
   
   ```

   *OPTIONAL: Below is the structure of the directory (for development purposes):*

   ```
   home
   ├── Access Control Service
   │   ├── app
   │   │   ├── models
   │   │   │   ├── access.js
   │   │   │   ├── group.js
   │   │   │   ├── role.js
   │   │   │   └── users.js
   │   │   └── routes
   │   │       └── api.js
   │   ├── index.js
   │   └── package.json
   ├── Create Service
   │   ├── app
   │   │   ├── routes
   │   │   │   ├── api.js
   │   │   │   └── tempData.json
   │   │   └── templates
   │   │       ├── bloodReport.json
   │   │       └── ecgReport.json
   │   ├── index.js
   │   └── package.json
   ├── Metadata Registry
   │   ├── app
   │   │   └── routes
   │   │       └── api.js
   │   ├── index.js
   │   ├── package-lock.json
   │   ├── package.json
   │   └── public
   │       ├── assets
   │       │   ├── css
   │       │   │   └── styles.css
   │       │   ├── js
   │       │   │   ├── app.config.js
   │       │   │   ├── app.module.js
   │       │   │   ├── controllers
   │       │   │   │   ├── create.js
   │       │   │   │   ├── mainCtrl.js
   │       │   │   │   ├── manage.js
   │       │   │   │   └── search.js
   │       │   │   ├── helper.js
   │       │   │   └── services
   │       │   │       └── mainServices.js
   │       │   └── libs
   │       ├── index.html
   │       └── pages
   │           ├── create.html
   │           ├── error.html
   │           ├── home.html
   │           ├── login.html
   │           ├── manage.html
   │           ├── read.html
   │           ├── register.html
   │           └── search.html
   ├── Search Service
   │   ├── app
   │   │   ├── models
   │   │   │   └── mdr.js
   │   │   ├── routes
   │   │   │   ├── api.js
   │   │   │   ├── search.js
   │   │   │   └── tempData.json
   │   │   └── templates
   │   │       ├── bloodReport.json
   │   │       └── ecgReport.json
   │   ├── esConnection.js
   │   ├── index.js
   │   ├── indexingData.js
   │   └── package.json
   ├── Storage Service
   │   ├── app
   │   │   ├── models
   │   │   │   └── mdr.js
   │   │   ├── routes
   │   │   │   ├── api.js
   │   │   │   └── tempData.json
   │   │   └── templates
   │   │       ├── bloodReport.json
   │   │       └── ecgReport.json
   │   ├── index.js
   │   └── package.json
   ├── Vagrantfile
   └── package.json
   ```

   

6. Navigate into the MetadataRegistryServices repository on your computer in a shell/terminal and type:

   *Windows should run CMD or powershell on administrator mode*

   ```
   vagrant up
   
   ```

   Vagrant will build your VM. This will take maybe 30 minutes to a few hours depending on your Internet connection speed. When this command finishes, your VM is ready to use.

   If an error is thrown after running this command, type:

   ```
   sudo apt-get remove --purge virtualbox 
   
   ```

   This will remove Virtual Box.Then type:

   ```
   sudo rm ~/"VirtualBox VMs" -Rf
   sudo rm ~/.config/VirtualBox/ -Rf
   ```

   This will delete all virtual machine settings. Then install the latest version of Virtual Box and vagrant from the links given in step 3 (using Ubuntu Software).

7. To stop and restart the VM:

   - When you are finished working, you can suspend the virtual machine (save state, a little faster to restart):

     ```
     vagrant suspend
     
     ```

     or halt the virtual machine (complete VM shutdown, a little slower to restart):

     ```
     vagrant halt
     
     ```

   - To resume work on a VM that is suspended or halted:

     ```
     vagrant up
     
     ```

   - If you just want to restart the VM (same as halt/up), type:

     ```
     vagrant reload
     
     ```

     If you haven’t made any drastic changes to the build script, you should be able to just re-provision the VM. You can do this by using the `--provision` flag with either `up` or `reload`. This is will be faster than doing a full `destroy`/`up`, however depending on the changes you’ve done to the VM, could leave it potentially unstable. If the VM breaks, simply `destroy`/`up` as normal.

     NOTE: when resuming work, you may see this warning several times, `default: Warning: Remote connection disconnect. Retrying.. .` These warnings are not harmful and can be ignored.

8. To completely delete the virtual machine (such as to start over from scratch with a fresh VM), type:

   ```
   vagrant destroy
   
   ```

   And if desired:

   ```
   vagrant up
   
   ```

9. When the VM is “up”, you can go visit the web application.

   - From a web browser (Chrome, Firefox, IE, etc.) on your host computer,

      Go to: <http://localhost:3000>

     (see the VM login & password info below)

   - You can login, create metadata, and search metadata:

     For login:

     Go to: <http://localhost:3000/login>

     For creating metadata (only reports of type "blood" is enabled):
     Go to: <http://localhost:3000/create>

     Following User List and Access Control List exists on the system:

     | **Username** | Password   | **Group**      | **Role** | **ItemType** | **Create** | **Read** | **Update** | **Delete** |
     | :----------- | ---------- | :------------- | -------- | :----------- | ---------- | -------- | ---------- | ---------- |
     | mittalchirag | Chirag@123 | CSE Department | Author   | blood        | True       | True     | False      | False      |
     | mittalchirag | Chirag@123 | CSE Department | Reader   | blood        | False      | True     | False      | False      |
     | tester       | Tester@123 | CSE Department | Reader   | blood        | False      | True     | False      | False      |
     | sharmaji     | Sharma@123 | CSE Department | Editor   | blood        | True       | True     | False      | False      |
     | sharmaji     | Sharma@123 | ME Department  | Editor   | blood        | True       | True     | False      | False      |

      

10. When the VM is “up”, you can connect from your host computer to the virtual machine via ssh. Windows users will need to install SSH software (e.g., [Cygwin](https://www.cygwin.com/) or[Putty](https://www.chiark.greenend.org.uk/~sgtatham/putty/latest.html) ). From a terminal in the repository directory type:

    ```
    vagrant ssh
    
    ```

    You will connect to the VM as the `root` user.

11. The following users exist on the VM:

    | user    | password | role      |
    | :------ | :------- | :-------- |
    | vagrant | vagrant  | Root user |

## Contributors

1. Chirag Mittal [@mittalchirag](<https://github.com/mittalchirag>)
2. Harshit Sharma [@hrshtt](<https://github.com/hrshtt>)
3. Rishabh Mittal [@mitrish](<https://github.com/mitrish>)
4. Prof. N D Gangadhar