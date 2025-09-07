// const ChecklistTemplate = require('../models/checklistTemplateModel');

// const createChecklistTemplate = async (req, res) => {
//   try {
//     const { name, visaType } = req.body;
//     const user = req.user;

//     if (!name || !visaType) {
//       return res.status(400).json({ message: 'Please provide a name and visa type.' });
//     }

//     const templateData = {
//       name,
//       visaType,
//       createdBy: user.id,
//     };

//     if (user.role === 'super-admin') {
//       templateData.isBaseTemplate = true;
//     } else {
//       templateData.consultancy = user.consultancy;
//     }

//     const template = await ChecklistTemplate.create(templateData);
//     res.status(201).json(template);
//   } catch (error) {
//     console.error(error);
//     if (error.code === 11000) {
//       return res.status(400).json({ message: 'A template with this name already exists for your consultancy.' });
//     }
//     res.status(500).json({ message: 'Server Error' });
//   }
// };

// const addTaskToTemplate = async (req, res) => {
//   try {
//     const { title, description, category } = req.body;
//     const templateId = req.params.templateId;

//     if (!title || !description || !category) {
//       return res.status(400).json({ message: 'Please provide title, description, and category for the task.' });
//     }

//     const template = await ChecklistTemplate.findById(templateId);

//     if (!template) {
//       return res.status(404).json({ message: 'Checklist template not found.' });
//     }

//     const newTask = { title, description, category };
//     template.tasks.push(newTask);
//     await template.save();

//     res.status(201).json(template);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server Error' });
//   }
// };

// const getChecklistTemplates = async (req, res) => {
//   try {
//     const user = req.user;
//     let query = {};

//     if (user.role === 'super-admin') {
//       query = {};
//     } else {
//       query = {
//         $or: [
//           { isBaseTemplate: true },
//           { consultancy: user.consultancy }
//         ]
//       };
//     }

//     const templates = await ChecklistTemplate.find(query).sort({ name: 1 });
//     res.status(200).json(templates);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server Error' });
//   }
// };

// module.exports = {
//   createChecklistTemplate,
//   addTaskToTemplate,
//   getChecklistTemplates
// };

const ChecklistTemplate = require('../models/checklistTemplateModel');

// @desc    Create a new checklist template
const createChecklistTemplate = async (req, res) => {
  try {
    const { name, visaType } = req.body;
    const user = req.user;

    if (!name || !visaType) {
      return res.status(400).json({ message: 'Please provide a name and visa type.' });
    }

    const templateData = { name, visaType, createdBy: user.id };

    if (user.role === 'super-admin') {
      templateData.isBaseTemplate = true;
    } else {
      templateData.consultancy = user.consultancy;
    }

    const template = await ChecklistTemplate.create(templateData);
    res.status(201).json(template);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: 'A template with this name already exists for your consultancy.' });
    }
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Get all available checklist templates for the user
const getChecklistTemplates = async (req, res) => {
  try {
    const user = req.user;
    let query = {};

    if (user.role === 'super-admin') {
      query = {}; // Super-admin sees all templates
    } else {
      // Counselors see base templates AND their own custom ones
      query = {
        $or: [
          { isBaseTemplate: true },
          { consultancy: user.consultancy }
        ]
      };
    }

    const templates = await ChecklistTemplate.find(query).sort({ name: 1 });
    res.status(200).json(templates);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Add a task to a checklist template
const addTaskToTemplate = async (req, res) => {
  try {
    const { title, description, category } = req.body;
    const template = await ChecklistTemplate.findById(req.params.templateId);

    if (!template) {
      return res.status(404).json({ message: 'Checklist template not found.' });
    }

    // Security check: ensure admin belongs to the template's consultancy or is a super-admin
    if (template.consultancy && (template.consultancy.toString() !== req.user.consultancy.toString())) {
      return res.status(403).json({ message: 'Not authorized to modify this template.' });
    }

    template.tasks.push({ title, description, category });
    await template.save();
    res.status(201).json(template);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};


module.exports = {
  createChecklistTemplate,
  getChecklistTemplates,
  addTaskToTemplate,
};