package provider.WzXML;

import java.awt.Point;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;

import org.w3c.dom.Document;
import org.w3c.dom.NamedNodeMap;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;
import org.xml.sax.SAXException;

import provider.MapleData;
import provider.MapleDataEntity;

public class XMLDomMapleData implements MapleData, Serializable {

    private Node node;
    private File imageDataDir;

    private XMLDomMapleData(final Node node) {
        this.node = node;
    }

    public XMLDomMapleData(final FileInputStream fis, final File imageDataDir) {
        try {

            DocumentBuilderFactory documentBuilderFactory = DocumentBuilderFactory.newInstance();
            DocumentBuilder documentBuilder = documentBuilderFactory.newDocumentBuilder();
            Document document = documentBuilder.parse(fis);
            this.node = document.getFirstChild();

        } catch (ParserConfigurationException | SAXException | IOException e) {
            throw new RuntimeException(e);
        }
        this.imageDataDir = imageDataDir;
    }

    @Override
    public MapleData getChildByPath(final String path) {
        final String[] segments = path.split("/");
        if (segments[0].equals("..")) {
            return ((MapleData) getParent()).getChildByPath(path.substring(path.indexOf("/") + 1));
        }

        Node myNode = node;
        for (String segment : segments) {
            NodeList childNodes = myNode.getChildNodes();
            boolean foundChild = false;
            for (int i = 0; i < childNodes.getLength(); i++) {
                final Node childNode = childNodes.item(i);
                if (childNode.getNodeType() == Node.ELEMENT_NODE
                        && childNode.getAttributes().getNamedItem("name").getNodeValue().equals(segment)) {
                    myNode = childNode;
                    foundChild = true;
                    break;
                }
            }
            if (!foundChild) {
                return null;
            }
        }
        final XMLDomMapleData ret = new XMLDomMapleData(myNode);
        ret.imageDataDir = new File(imageDataDir, getName() + "/" + path).getParentFile();
        return ret;
    }

    @Override
    public List<MapleData> getChildren() {
        final List<MapleData> ret = new ArrayList<>();
        final NodeList childNodes = node.getChildNodes();
        for (int i = 0; i < childNodes.getLength(); i++) {
            final Node childNode = childNodes.item(i);
            if (childNode.getNodeType() == Node.ELEMENT_NODE) {
                final XMLDomMapleData child = new XMLDomMapleData(childNode);
                child.imageDataDir = new File(imageDataDir, getName());
                ret.add(child);
            }
        }
        return ret;
    }

    @Override
    public Object getData() {
        final NamedNodeMap attributes = node.getAttributes();
        final MapleDataType type = getType();
        if (type == null) {
            return null;
        }
        switch (type) {
            case DOUBLE: {
                return Double.parseDouble(attributes.getNamedItem("value").getNodeValue());
            }
            case FLOAT: {
                return Float.parseFloat(attributes.getNamedItem("value").getNodeValue());
            }
            case INT: {
                return Integer.parseInt(attributes.getNamedItem("value").getNodeValue());
            }
            case SHORT: {
                return Short.parseShort(attributes.getNamedItem("value").getNodeValue());
            }
            case STRING:
            case UOL: {
                return attributes.getNamedItem("value").getNodeValue();
            }
            case VECTOR: {
                return new Point(Integer.parseInt(attributes.getNamedItem("x").getNodeValue()),
                        Integer.parseInt(attributes.getNamedItem("y").getNodeValue()));
            }
            case CANVAS: {
                return new FileStoredPngMapleCanvas(Integer.parseInt(attributes.getNamedItem("width").getNodeValue()),
                        Integer.parseInt(attributes.getNamedItem("height").getNodeValue()),
                        new File(imageDataDir, getName() + ".png"));
            }
        }
        return null;
    }

    public final MapleDataType getType() {
        final String nodeName = node.getNodeName();
        switch (nodeName) {
            case "imgdir":
                return MapleDataType.PROPERTY;
            case "canvas":
                return MapleDataType.CANVAS;
            case "convex":
                return MapleDataType.CONVEX;
            case "sound":
                return MapleDataType.SOUND;
            case "uol":
                return MapleDataType.UOL;
            case "double":
                return MapleDataType.DOUBLE;
            case "float":
                return MapleDataType.FLOAT;
            case "int":
                return MapleDataType.INT;
            case "short":
                return MapleDataType.SHORT;
            case "string":
                return MapleDataType.STRING;
            case "vector":
                return MapleDataType.VECTOR;
            case "null":
                return MapleDataType.IMG_0x00;
        }
        return null;
    }

    @Override
    public MapleDataEntity getParent() {
        final Node parentNode = node.getParentNode();
        if (parentNode.getNodeType() == Node.DOCUMENT_NODE) {
            return null; // can't traverse outside the img file - TODO is this a problem?
        }
        final XMLDomMapleData parentData = new XMLDomMapleData(parentNode);
        parentData.imageDataDir = imageDataDir.getParentFile();
        return parentData;
    }

    @Override
    public String getName() {
        return node.getAttributes().getNamedItem("name").getNodeValue();
    }

    @Override
    public Iterator<MapleData> iterator() {
        return getChildren().iterator();
    }
}
