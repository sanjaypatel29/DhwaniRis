const { stateDataValidator, childDataValidator } = require("../Validation/validation")
const StateData = require("../Models/stateData")
const ChildData = require("../Models/childData");

//  state post method for add state name
const poststateData = async (req, res) => {
    try {
        const { stateName } = req.body;
        const { error } = stateDataValidator(req.body);
        if (error) {
            return res.status(400).send(error.details[0].message);
        }

        const stateExists = await StateData.findOne({ stateName });
        if (stateExists) {
            throw new Error('State already exists');
        }
        const state = new StateData({
            stateName: req.body.stateName,
            district: req.body.district
        });

        try {
            const savedStateData = await state.save();
            res.send("State Name Added Successfully");
        } catch (err) {
            res.status(400).send(err);
        }
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
}

//  state get method for get all state name
const getAllstate = async (req, res) => {
    try {
        const stateData = await StateData.find()
        var data = []
        for (var i = 0; i < stateData.length; i++) {
            data.push(stateData[i].stateName)
        }
        res.status(200).send(data)
    } catch (err) {
        res.status(400).send(err)
    }
}

//  District post method for add District name
const postDistrict = async (req, res) => {
    try {
        const { districtName } = req.body;
        const state = await StateData.findOne({ stateName: req.params.stateName });

        if (state) {
            const District = state.district
            var obj = {
                districtName: req.body.districtName,
            }
            District.push(obj)
            state.save()
            return res.status(200).send("District Added Successfully");
        } else {
            return res.send("State not available")
        }

    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};

//  disticrt get method for get all district name
const getAllDistrict = async (req, res) => {
    const state = await StateData.findOne({ stateName: req.params.stateName });
    const District = state.district
    if (District.length > 0) {
        var data = []
        for (var i = 0; i < District.length; i++) {
            data.push(District[i].districtName)
        }
        res.status(200).send(data)
    } else {
        res.send("No district available")
    }
};

//  child post method for add child Detail
const postChild = async (req, res) => {
    const { error } = childDataValidator(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    const child = new ChildData({
        name: req.body.name,
        sex: req.body.sex,
        fatherName: req.body.fatherName,
        motherName: req.body.motherName,
        dob: req.body.dob,
        image: req.body.image,
        districtName: req.body.districtName,
        stateName: req.body.stateName,
    });

    try {
        const savedChildData = await child.save();
        res.send("Child Data Added Successfully");
    } catch (err) {
        res.status(400).send(err);
    }
}

//  child get method for get all child Detail
const getChild = (req, res) => {
    ChildData.find()
        .then((childData) => (childData))
        .then((childData) => res.json(childData))
        .catch((err) => res.status(400).json("Error: " + err));
};

module.exports = { poststateData, getAllstate, postDistrict, getAllDistrict, postChild, getChild }